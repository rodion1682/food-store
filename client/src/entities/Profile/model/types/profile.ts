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
}
