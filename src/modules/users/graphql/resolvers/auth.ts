import {
  Resolver,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  InputType,
} from 'type-graphql';
import { gqlContext } from '../../../../graphql/context';
import { signup, login, logout } from '../../controllers/authController';

@InputType()
class authInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class authResponse {
  @Field()
  message: string;

  @Field()
  accessToken?: string;
}

@Resolver()
export class authResolver {
  @Mutation(() => authResponse)
  async register(
    @Arg('authInput') authInput: authInput,
    @Ctx() { res }: gqlContext
  ): Promise<authResponse> {
    const { email, password } = authInput;
    if (!email || !password) throw new Error('Invalid Credentials');
    return signup(res, email, password);
  }

  @Mutation(() => authResponse)
  async login(
    @Arg('authInput') authInput: authInput,
    @Ctx() { res }: gqlContext
  ): Promise<authResponse> {
    const { email, password } = authInput;
    if (!email || !password) throw new Error('Invalid Credentials');
    return login(res, email, password);
  }

  @Mutation(() => authResponse)
  async logout(@Ctx() { res }: gqlContext) {
    return logout(res);
  }
}
