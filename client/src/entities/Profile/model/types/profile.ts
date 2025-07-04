import { Currency } from 'shared/consts/common';

export interface Profile {
	id: number;
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	avatar: string;
	currency: Currency;
}

export interface ProfileSchema {
	data?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
}
