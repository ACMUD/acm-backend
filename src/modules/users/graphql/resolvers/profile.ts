import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  ObjectType,
  Field,
} from 'type-graphql';
import { authValidation, authContext } from '../middleware/auth';

import { getMe, updateMe } from '../../controllers/profileController';
import { Profile } from '../../entities/Profile';
import { updateProfileDTO } from '../../dtos/profileDTO';

@ObjectType()
class generalResponse {
  @Field()
  message: string;
}

@Resolver(of => Profile)
export class profileResolver {
  @Query(returns => Profile, { nullable: true })
  @UseMiddleware(authValidation)
  async me(@Ctx() { user }: authContext) {
    if (!user) throw new Error('Not Authenticated');

    const { profileId } = user;
    return getMe(profileId);
  }

  @UseMiddleware(authValidation)
  @Mutation(returns => generalResponse)
  async updateMe(
    @Arg('profileInput') profileInput: updateProfileDTO,
    @Ctx() { user }: authContext
  ): Promise<generalResponse> {
    if (!user) throw new Error('Not Authenticated');

    const { profileId } = user;
    const { firstName, lastName, description, udCode } = profileInput;
    await updateMe(profileId, { firstName, lastName, description, udCode });

    return {
      message: 'The profile has been updated successfully',
    };
  }
}
