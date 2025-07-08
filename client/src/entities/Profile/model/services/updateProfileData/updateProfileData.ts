import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ValidateProfileErrors } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<ValidateProfileErrors[]>
>('profile/updateProfileData', async (_, thinkApi) => {
	const { extra, rejectWithValue, getState } = thinkApi;

	const formData = getProfileForm(getState());

	const errors = validateProfileData(formData);

	if (errors.length) {
		return rejectWithValue(errors);
	}

	try {
		const response = await extra.api.put<Profile>(
			'/profile/updateProfile.php',
			formData,
			{ withCredentials: true }
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
	}
});
