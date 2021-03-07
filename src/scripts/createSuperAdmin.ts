import { randomBytes } from 'crypto';
import {
  activeAccount,
  createAccount,
} from 'modules/auth/controllers/accountController';
import { accountRepository } from 'modules/auth/repositories/accountRepository';
import { typeAccountRepository } from 'modules/auth/repositories/typeAccountRepository';
import { createDBConnection } from 'services/database';
import { createTypeAccounts } from './createBasicTypeAccount';

export async function createSuperUser() {
  try {
    await createDBConnection();

    // GET SUPER USER DATA
    const email = 'udistrital.acmud@gmail.com';
    const password = process.env.SUPER_USER_PASSWORD || 'acmudadmin';

    // Find Existing Super User
    const accountRepo = accountRepository();
    let adminUser = await accountRepo.findByEmail(email);

    // If does not exist, then created
    if (!adminUser) {
      const verifyToken = randomBytes(20).toString('hex');
      adminUser = await createAccount({ email, password, verifyToken });
      await activeAccount(email, verifyToken);
    }

    // Find Admin Role
    const typesRepo = typeAccountRepository();
    const adminRole = await typesRepo.findOne({ where: { name: 'admin' } });

    // Create adminRole if not exist
    if (!adminRole) {
      await createTypeAccounts();
      await createSuperUser();
    } else if (!adminUser.typeAccount?.includes(adminRole)) {
      // Asociate Admin Role to Super User
      adminUser.typeAccount = [adminRole];
      accountRepo.save(adminUser);
    }
  } catch (error) {
    console.log(error);
  }
}

createSuperUser();
