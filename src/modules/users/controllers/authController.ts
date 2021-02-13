import { hash, compare } from 'bcrypt';
import { accountRepository } from '../repositories/accountRepository';

async function createAccount(email: string, password: string) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findOne({ email });
  if (existingAccount) throw new Error('User Account already exists');

  const saltRounds = process.env.SALT_ROUNDS || 12;
  const hashedPassword = await hash(password, saltRounds);

  const newAccount = accountRepo.create({
    email,
    password: hashedPassword,
  });

  return accountRepo.save(newAccount);
}

async function verifyAccount(email: string, password: string) {
  const accountRepo = accountRepository();

  const existingAccount = await accountRepo.findOne({ email });
  if (!existingAccount) throw new Error('User Account does not exists');

  const valid = await compare(password, existingAccount.password);
  if (!valid) throw new Error('Invalid password');

  return existingAccount;
}

export { createAccount, verifyAccount };
