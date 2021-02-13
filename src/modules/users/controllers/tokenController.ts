import { sign, verify } from 'jsonwebtoken';
import { Account } from '../entities/Account';
import { authDTO } from '../dtos/authDTO';

async function generateJWT(account: Account) {
  const SECRET = process.env.JWT_SECRET || 'supersecrettoken';
  return sign({ accountId: account.id }, SECRET);
}

async function verifyJWT(jwt: string) {
  const SECRET = process.env.JWT_SECRET || 'supersecrettoken';
  const auth = verify(jwt, SECRET);
  if (!auth) throw new Error('Invalid Token');
  return auth as authDTO;
}

export { generateJWT, verifyJWT };
