import { StateSchema } from 'app/providers/StoreProvider';
import { LoginSchema } from '../../types/loginSchema';

export const getLoginState = (state: StateSchema): LoginSchema =>
	state?.loginForm!;
