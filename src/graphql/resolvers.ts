import { authResolver, googleAuthResolver } from 'modules/auth';
import { profileResolver } from 'modules/users';

const resolvers: Function[] = [
  authResolver,
  googleAuthResolver,
  profileResolver,
];

export { resolvers };
