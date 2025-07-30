import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage';
import { SignupSchema } from '../types/signupSchema';

export const signup = createAsyncThunk<User, SignupSchema, ThunkConfig<string>>(
	'signup/signup',
	async (signupData, thinkApi) => {
		const { dispatch, extra, rejectWithValue } = thinkApi;

		const signUpDataToSend = new FormData();
		signUpDataToSend.append('firstname', signupData.firstname);
		signUpDataToSend.append('lastname', signupData.lastname);
		signUpDataToSend.append('username', signupData.username);
		signUpDataToSend.append('email', signupData.email);
		signUpDataToSend.append('password', signupData.password);
		if (signupData.currency) {
			signUpDataToSend.append('currency', signupData.currency);
		}
		if (signupData.avatar) {
			signUpDataToSend.append('avatar', signupData.avatar);
		}

		console.log('signupData', signupData);

		try {
			const response = await extra.api.post<User>(
				'/api/auth/signup',
				signUpDataToSend
			);

			if (!response.data) {
				throw new Error('No data returned from server');
			}

			localStorage.setItem(
				USER_LOCALSTORAGE_KEY,
				JSON.stringify(response.data)
			);

			dispatch(userActions.setAuthData(response.data));

			extra.navigate?.(RoutePath.profile);

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	}
);
