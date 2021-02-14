import { hash, compare } from 'bcrypt';
import { accountRepository } from '../repositories/accountRepository';
import { profileRepository } from '../repositories/profileRepository';
import { typeAccountRepository } from '../repositories/typeAccountRepository';

async function createAccount(email: string, password: string) {
  const accountRepo = accountRepository();
  const profileRepo = profileRepository();
  const typesRepo = typeAccountRepository();

  const existingAccount = await accountRepo.findByEmail(email);
  if (existingAccount) throw new Error('User Account already exists');

  const saltRounds = process.env.SALT_ROUNDS || 12;
  const hashedPassword = await hash(password, saltRounds);
  const newAccount = accountRepo.create({
    email,
    password: hashedPassword,
  });

  const profileAssociated = await profileRepo.findByEmail(email);
  if (profileAssociated) {
    newAccount.userProfile = profileAssociated;
  } else {
    const newProfile = profileRepo.create({ email });
    newAccount.userProfile = newProfile;
  }

  const basicTypeAccount = await typesRepo.findByName('basic');
  if (basicTypeAccount) {
    newAccount.typeAccount = [basicTypeAccount];
  }

  return accountRepo.save(newAccount);
}

async function verifyAccount(email: string, password: string) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findOne({
    where: { email },
    relations: ['userProfile'],
  });
  if (!existingAccount) throw new Error('User Account does not exists');

  const valid = await compare(password, existingAccount.password);
  if (!valid) throw new Error('Invalid password');

  return existingAccount;
}

async function getAccountById(id: string) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findOne({
    where: { id },
    relations: ['userProfile'],
  });
  if (!existingAccount) throw new Error('User Account does not exists');

  return existingAccount;
}

export { createAccount, verifyAccount, getAccountById };
