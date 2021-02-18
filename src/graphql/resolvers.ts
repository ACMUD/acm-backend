import { authResolver } from 'modules/auth';
import { profileResolver } from 'modules/users';

const resolvers: Function[] = [authResolver, profileResolver];

export { resolvers };
