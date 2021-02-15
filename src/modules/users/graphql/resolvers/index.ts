import { authResolver } from './auth';
import { profileResolver } from './profile';

const usersResolvers: Function[] = [authResolver, profileResolver];

export { usersResolvers };
