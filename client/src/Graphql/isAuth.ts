import { makeVar } from '@apollo/client';

const isAuthenticated = makeVar(false);
export default isAuthenticated;

export const isOwner = makeVar(false);
