import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginEmail = (state: StateSchema): string =>
	state?.loginForm?.email!;
