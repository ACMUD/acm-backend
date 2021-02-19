import { authDTO } from '../dtos/authDTO';
import { getTokens } from '../utils/generateTokens';
import {
  activeAccount,
  createAccount,
  verifyAccount,
} from './accountController';

import { randomBytes } from 'crypto';
import { sendMail } from 'services/emailSender';
import { sign, verify } from 'jsonwebtoken';

async function signup({ email, password }: authDTO, verifyAccountUrl?: string) {
  if (!email || !password) throw new Error('Invalid Credentials');

  const verifyToken = randomBytes(20).toString('hex');
  await createAccount({
    email: email.trim().toLowerCase(),
    password,
    verifyToken,
  });

  const emailToken = sign({ email, verifyToken }, '', { expiresIn: '30m' });
  const verifyUrl = `${verifyAccountUrl}${emailToken}`;
  sendMail({
    to: email,
    subject: 'ACMUD - Verify Account',
    html: `
      <h1>Hello</h1>
      <p>Please verify your account by clicking the link:</p>
      <div>
        <a href="${verifyUrl}">${verifyUrl}</a>
      </div>
      <br><br>
      <p>Thank You!</p>
    `,
  });
}

async function verifySingup(emailToken: string) {
  const payload = verify(emailToken, '');
  if (!payload) throw new Error('Erro with tokaen');

  const { email, verifyToken } = payload as any;
  const account = await activeAccount(email, verifyToken);
  return getTokens(account);
}

async function login({ email, password }: authDTO) {
  if (!email || !password) throw new Error('Invalid Credentials');

  const loggedUSer = await verifyAccount({
    email: email.trim().toLowerCase(),
    password,
  });
  return getTokens(loggedUSer);
}

export { signup, login, verifySingup };
