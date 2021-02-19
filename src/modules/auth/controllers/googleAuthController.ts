import { randomBytes } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { updateMe } from 'modules/users';
import { getTokens } from '../utils/generateTokens';

import { createAccount, getAccountByEmail } from './accountController';

const googleID =
  process.env.CLIENT_ID ||
  '953529045812-c4v3qohqmaug0vtbek0n99fcibdvt0kf.apps.googleusercontent.com';
const googleClient = new OAuth2Client(googleID);

async function signWithGoogle(idToken: string) {
  const ticket = await googleClient.verifyIdToken({
    audience: googleID,
    idToken,
  });
  const { given_name, family_name, email, picture } = ticket.getPayload()!;
  const randomPassword = randomBytes(20).toString('hex');
  const randomToken = randomBytes(20).toString('hex');
  const createdAccount = await createAccount({
    email: email!,
    password: randomPassword,
    verifyToken: randomToken,
  });

  const { id } = createdAccount.userProfile;
  await updateMe(`${id}`, {
    firstName: given_name,
    lastName: family_name,
    imageUrl: picture,
  });

  return getTokens(createdAccount);
}

async function loginWithGoogle(idToken: string) {
  const ticket = await googleClient.verifyIdToken({
    audience: googleID,
    idToken,
  });
  const { email } = ticket.getPayload()!;
  const existingAccount = await getAccountByEmail(email!);

  return getTokens(existingAccount);
}

export { loginWithGoogle, signWithGoogle };
