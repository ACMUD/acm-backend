import { Resolver, Mutation, Arg, Field, Ctx, InputType } from 'type-graphql';
import { gqlContext } from 'graphql/context';
import { addRefreshToken } from '../utils/refreshCookie';
import {
  loginWithGoogle,
  signWithGoogle,
} from '../controllers/googleAuthController';
import { authResponse } from './auth';
@InputType()
class googleAuthInput {
  @Field()
  tokenId: string;
}

@Resolver()
export class googleAuthResolver {
  @Mutation(() => authResponse)
  async googleRegister(
    @Arg('googleAuthInput') googleAuthInput: googleAuthInput,
    @Ctx() { res }: gqlContext
  ): Promise<authResponse> {
    const { tokenId } = googleAuthInput;
    const [accessToken, refreshToken] = await signWithGoogle(tokenId);
    addRefreshToken(res, refreshToken);

    return {
      message: 'The account has been created successfully',
      accessToken,
    };
  }

  @Mutation(() => authResponse)
  async googleLogin(
    @Arg('googleAuthInput') googleAuthInput: googleAuthInput,
    @Ctx() { res }: gqlContext
  ): Promise<authResponse> {
    const { tokenId } = googleAuthInput;
    const [accessToken, refreshToken] = await loginWithGoogle(tokenId);
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
