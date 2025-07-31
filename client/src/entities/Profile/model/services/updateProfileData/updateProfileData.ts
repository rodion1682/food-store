import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ValidateProfileErrors } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage';

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
	if (!formData) {
		return rejectWithValue([ValidateProfileErrors.NO_DATA]);
	}

	try {
		const formDataToSend = new FormData();
		formDataToSend.append('id', String(formData.id));
		formDataToSend.append('firstname', formData.firstname ?? '');
		formDataToSend.append('lastname', formData.lastname ?? '');
		formDataToSend.append('username', formData.username ?? '');
		formDataToSend.append('email', formData.email ?? '');
		formDataToSend.append('currency', formData.currency ?? '');
		formDataToSend.append('avatar', formData.avatar ?? '');

		if (formData.updatedAvatarFile) {
			formDataToSend.append('updatedAvatarFile', formData.updatedAvatarFile);
		}

		const response = await extra.api.post<Profile>(
			'/api/profile/updateProfileData',
			formDataToSend,
			{ withCredentials: true }
		);

		const localStoregaData = {
			id: response.data.id,
			username: response.data.username,
			avatar: response.data.avatar,
			currency: response.data.currency,
			email: response.data.email,
		};

		localStorage.setItem(
			USER_LOCALSTORAGE_KEY,
			JSON.stringify(localStoregaData)
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
	}
});
