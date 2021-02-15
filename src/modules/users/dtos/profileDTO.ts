import { Field, InputType } from 'type-graphql';

@InputType()
export class updateProfileDTO {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  udCode?: string;
}
