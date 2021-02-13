import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Account } from '../entities/Account';

@EntityRepository()
export class AccountRepository extends Repository<Account> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findAssociateProfile(id: string) {
    return new Promise(async resolve => {
      const account = await this.findOne({
        where: { id },
        relations: ['userProfile'],
      });

      resolve(account?.userProfile);
    });
  }
}

export function accountRepository() {
  return getCustomRepository(AccountRepository);
}
