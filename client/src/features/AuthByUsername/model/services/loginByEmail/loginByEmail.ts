import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage';

interface loginByEmailProps {
	email: string;
	password: string;
}

export const loginByEmail = createAsyncThunk<
	User,
	loginByEmailProps,
	ThunkConfig<string>
>('login/loginByEmail', async (authData, thinkApi) => {
	const { dispatch, extra, rejectWithValue } = thinkApi;
	try {
		const response = await extra.api.post<User>('/api/auth/login', authData);

		console.log('authData', authData);

		if (!response.data) {
			throw new Error();
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
});
