export enum ValidateProfileErrors {
	INCORRECT_USER_FIRSTNAME = 'INCORRECT_USER_FIRSTNAME',
	INCORRECT_USER_LASTNAME = 'INCORRECT_USER_LASTNAME',
	INCORRECT_USERNAME = 'INCORRECT_USERNAME',

	INCORRECT_USER_EMAIL = 'INCORRECT_USER_EMAIL',
	EMPTY_USER_EMAIL = 'EMPTY_USER_EMAIL',

	NO_DATA = 'NO_DATA',
	SERVER_ERROR = 'SERVER_ERROR',
}

export interface Profile {
	firstname?: string;
	lastname?: string;
	username?: string;
	email?: string;
	avatar?: string;
	currency?: string;
}

export interface ProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	validateErrors?: ValidateProfileErrors[];
}
