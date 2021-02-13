import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Account } from '../entities/Account';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  async findAssociateProfile(id: string) {
    const account = await this.findOne({
      where: { id },
      relations: ['userProfile'],
    });

    return account?.userProfile;
  }
}

export function accountRepository() {
  return getCustomRepository(AccountRepository);
}
