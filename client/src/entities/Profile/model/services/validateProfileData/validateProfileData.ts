import { EMAIL_REG_EXP } from 'shared/consts/common';
import { Profile, ValidateProfileErrors } from '../../types/profile';
import { log } from 'node:console';

export const validateProfileData = (
	profile?: Profile
): ValidateProfileErrors[] => {
	if (!profile) {
		return [ValidateProfileErrors.NO_DATA];
	}
	const { firstname, lastname, username, email } = profile;

	const errors: ValidateProfileErrors[] = [];

	if (!firstname) {
		errors.push(ValidateProfileErrors.INCORRECT_USER_FIRSTNAME);
	}

	if (!lastname) {
		errors.push(ValidateProfileErrors.INCORRECT_USER_LASTNAME);
	}

	if (!username) {
		errors.push(ValidateProfileErrors.INCORRECT_USERNAME);
	}

	console.log(!email);
	console.log(!EMAIL_REG_EXP.test(email!));

	if (email && !EMAIL_REG_EXP.test(email)) {
		errors.push(ValidateProfileErrors.INCORRECT_USER_EMAIL);
	}

	if (!email) {
		errors.push(ValidateProfileErrors.EMPTY_USER_EMAIL);
	}

	return errors;
};
