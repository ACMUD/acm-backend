import { OAuth2Client } from 'google-auth-library';
import { createAccount, getAccountByEmail } from './accountController';
import { updateMe } from './profileController';
import { getTokens } from './tokenController';

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
  const randomPassword = ''; //randomPassword();
  const createdAccount = await createAccount(email!, randomPassword);

  const { id } = createdAccount.userProfile;
  await updateMe(`${id}`, {
    firstName: given_name,
    lastName: family_name,
    imageUrl: picture,
  });

  return await getTokens(createdAccount);
}

async function loginWithGoogle(idToken: string) {
  const ticket = await googleClient.verifyIdToken({
    audience: googleID,
    idToken,
  });
  const { email } = ticket.getPayload()!;
  const existingAccount = await getAccountByEmail(email!);

  return await getTokens(existingAccount);
}

export { loginWithGoogle, signWithGoogle };
