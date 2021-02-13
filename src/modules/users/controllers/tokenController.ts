import { sign, verify } from 'jsonwebtoken';
import { Account } from '../entities/Account';

async function generateJWT(value: string | Account) {
  let userId;
  if (typeof value === 'string') {
    userId = value;
  } else {
    userId = value.id;
  }

  const SECRET = process.env.JWT_SECRET || 'supersecrettoken';
  return sign({ userId }, SECRET);
}

async function verifyJWT(jwt: string) {
  const SECRET = process.env.JWT_SECRET || 'supersecrettoken';
  const userId = verify(jwt, SECRET);
  if (!userId) throw new Error('Invalid Token');

  return userId;
}

export { generateJWT, verifyJWT };
