import { typeAccountRepository } from '@Modules/auth/repositories/typeAccountRepository';
import { createDBConnection } from '@Services/database';

export async function createTypeAccounts() {
  try {
    await createDBConnection();

    const typesRepo = typeAccountRepository();
    const types = await typesRepo.find();

    await Promise.all(types.map(type => typesRepo.remove(type)));

    await typesRepo.insert([
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
