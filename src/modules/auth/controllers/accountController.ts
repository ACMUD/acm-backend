import { hash, compare } from 'bcrypt';
import { createBlankProfile, getMeByEmail } from 'modules/users';
import { authDTO, createAccountDTO } from '../dtos/authDTO';

import { accountRepository } from '../repositories/accountRepository';
import { typeAccountRepository } from '../repositories/typeAccountRepository';

async function createAccount({
  email,
  password,
  verifyToken,
}: createAccountDTO) {
  const accountRepo = accountRepository();
  const typesRepo = typeAccountRepository();

  const existingAccount = await accountRepo.findByEmail(email);
  if (existingAccount) throw new Error('User Account already exists');

  const saltRounds = process.env.SALT_ROUNDS || 12;
  const hashedPassword = await hash(password, saltRounds);
  const newAccount = accountRepo.create({
    email,
    password: hashedPassword,
    verifyToken,
  });

  try {
    const profileAssociated = await getMeByEmail(email);
    newAccount.userProfile = profileAssociated;
  } catch (err) {
    const newProfile = await createBlankProfile({ email });
    newAccount.userProfile = newProfile;
  }

  const basicTypeAccount = await typesRepo.findByName('basic');
  if (basicTypeAccount) {
    newAccount.typeAccount = [basicTypeAccount];
  }

  return accountRepo.save(newAccount);
}

async function verifyAccount({ email, password }: authDTO) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findByEmailWithProfile(email);
  if (!existingAccount) throw new Error('User Account does not exists');

  const valid = await compare(password, existingAccount.password);
  if (!valid) throw new Error('Invalid password');

  if (!existingAccount.active)
    throw new Error('The account has not been activated');

  return existingAccount;
}

async function activeAccount(email: string, verifyToken: string) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findByEmailWithProfile(email);
  if (!existingAccount) throw new Error('User Account does not exists');

  if (existingAccount.verifyToken !== verifyToken)
    throw new Error('Invalid verify Token');

  existingAccount.active = true;
  existingAccount.verifyToken = '';

  return accountRepo.save(existingAccount);
}

async function getAccountById(id: string) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findByIdWithProfile(id);
  if (!existingAccount) throw new Error('User Account does not exists');

  return existingAccount;
}

async function getAccountByEmail(email: string) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findByEmailWithProfile(email);
  if (!existingAccount) throw new Error('User Account does not exists');

  return existingAccount;
}

export {
  createAccount,
  verifyAccount,
  getAccountById,
  getAccountByEmail,
  activeAccount,
};
