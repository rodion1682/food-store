import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<string>
>('profile/updateProfileData', async (_, thinkApi) => {
	const { extra, rejectWithValue, getState } = thinkApi;

	const formData = getProfileForm(getState());

	try {
		const response = await extra.api.put<Profile>(
			'/profile/updateProfile.php',
			formData,
			{ withCredentials: true }
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
