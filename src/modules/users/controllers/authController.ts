import { createAccount, verifyAccount } from './accountController';
import { getTokens } from './tokenController';

async function signup(email: string, password: string) {
  if (!email || !password) throw new Error('Invalid Credentials');

  const createdAccount = await createAccount(email, password);
  return getTokens(createdAccount);
}

async function login(email: string, password: string) {
  if (!email || !password) throw new Error('Invalid Credentials');

  const loggedUSer = await verifyAccount(email, password);
  return await getTokens(loggedUSer);
}

export { signup, login };
