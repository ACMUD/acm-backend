import { hash, compare } from 'bcrypt';
import { createBlankProfile, getMeByEmail } from 'modules/users';
import { authDTO } from '../dtos/authDTO';

import { accountRepository } from '../repositories/accountRepository';
import { typeAccountRepository } from '../repositories/typeAccountRepository';

async function createAccount({ email, password }: authDTO) {
  const accountRepo = accountRepository();
  const typesRepo = typeAccountRepository();

  const existingAccount = await accountRepo.findByEmail(email);
  if (existingAccount) throw new Error('User Account already exists');

  const saltRounds = process.env.SALT_ROUNDS || 12;
  const hashedPassword = await hash(password, saltRounds);
  const newAccount = accountRepo.create({
    email,
    password: hashedPassword,
  });

  const profileAssociated = await getMeByEmail(email);
  if (profileAssociated) {
    newAccount.userProfile = profileAssociated;
  } else {
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

  return existingAccount;
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

export { createAccount, verifyAccount, getAccountById, getAccountByEmail };
