import { authDTO } from '../dtos/authDTO';
import { getTokens } from '../utils/generateTokens';
import { createAccount, verifyAccount } from './accountController';

async function signup({ email, password }: authDTO) {
  if (!email || !password) throw new Error('Invalid Credentials');

  const createdAccount = await createAccount({
    email: email.trim().toLowerCase(),
    password,
  });
  return getTokens(createdAccount);
}

async function login({ email, password }: authDTO) {
  if (!email || !password) throw new Error('Invalid Credentials');

  const loggedUSer = await verifyAccount({
    email: email.trim().toLowerCase(),
    password,
  });
  return getTokens(loggedUSer);
}

export { signup, login };
