import { StateSchema } from 'app/providers/StoreProvider';

export const getSignupIsLoading = (state: StateSchema): boolean =>
	state?.signupForm?.isLoading || false;
