import { StateSchema } from 'app/providers/StoreProvider';
import { SignupSchema } from '../../types/signupSchema';
import { Currency } from 'entities/Currency';

const initialState: SignupSchema = {
	firstname: '',
	lastname: '',
	username: '',
	email: '',
	password: '',
	avatar: null,
	currency: Currency.EURO,
};

export const getSignupData = (state: StateSchema) =>
	state?.signupForm || initialState;
