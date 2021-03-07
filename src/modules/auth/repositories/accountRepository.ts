import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Account } from '../entities/Account';

@EntityRepository(Account)
class AccountRepository extends Repository<Account> {
  findByEmail(email: string) {
    return this.findOne({
      where: { email },
      relations: ['typeAccount'],
    });
  }

  async findByIdWithProfile(id: string) {
    return this.findOne({
      where: { id },
      relations: ['typeAccount', 'userProfile'],
    });
  }

  async findByEmailWithProfile(email: string) {
    return this.findOne({
      where: { email },
      relations: ['typeAccount', 'userProfile'],
    });
  }
}

export function accountRepository() {
  return getCustomRepository(AccountRepository);
}
