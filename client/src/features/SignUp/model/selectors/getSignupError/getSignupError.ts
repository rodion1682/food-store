import { StateSchema } from 'app/providers/StoreProvider';

export const getSignupError = (state: StateSchema): string =>
	state?.signupForm?.error || '';
