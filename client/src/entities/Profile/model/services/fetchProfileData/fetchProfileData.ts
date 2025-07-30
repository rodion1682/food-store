import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
	Profile,
	string,
	ThunkConfig<string>
>('profile/fetchProfileData', async (userId, thinkApi) => {
	const { dispatch, extra, rejectWithValue } = thinkApi;
	try {
		//const response = await extra.api.get<Profile>('/profile.php', {
		//	params: { email },
		//});
		const response = await extra.api.get<Profile>(
			'/api/profile/getProfileData',
			{
				params: { userId },
			}
		);

		console.log('response.data', response.data);

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
