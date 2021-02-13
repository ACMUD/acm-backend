import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { TypeAccount } from '../entities/TypeAccount';

@EntityRepository(TypeAccount)
export class TypeAccountRepository extends Repository<TypeAccount> {
  findByName(name: string) {
    return this.findOne({ name });
  }
}

export function typeAccountRepository() {
  return getCustomRepository(TypeAccountRepository);
}
