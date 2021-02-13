import { typeAccountRepository } from '../modules/users/repositories/typeAccountRepository';
import { createDBConnection } from '../services/database';

async function createTypeAccounts() {
  try {
    await createDBConnection();

    const typesRepo = typeAccountRepository();
    const types = await typesRepo.find();

    await Promise.all(types.map(type => typesRepo.remove(type)));

    await typesRepo.insert([
      {
        name: 'basic',
        description: 'basic access permissions to profile data',
      },
      {
        name: 'admin',
        description: 'all access granted',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

createTypeAccounts();
