import {
  Resolver,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  InputType,
} from 'type-graphql';
import { gqlContext } from 'graphql/context';
import { login, signup } from '../controllers/authController';
import { addRefreshToken } from '../utils/refreshCookie';

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
    const [accessToken, refreshToken] = await signup({ email, password });
    addRefreshToken(res, refreshToken);

    return {
      message: 'The account has been created successfully',
      accessToken,
    };
  }

  @Mutation(() => authResponse)
  async login(
    @Arg('authInput') authInput: authInput,
    @Ctx() { res }: gqlContext
  ): Promise<authResponse> {
    const { email, password } = authInput;
    const [accessToken, refreshToken] = await login({ email, password });
    addRefreshToken(res, refreshToken);

    return {
      message: 'Successfully Login',
      accessToken,
    };
  }

  @Mutation(() => authResponse)
  async logout(@Ctx() { res }: gqlContext) {
    addRefreshToken(res, '');
    return {
      message: 'Successfull Logout',
    };
  }
}
