import { Currency } from 'entities/Currency';

export interface SignupSchema {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	password: string;
	avatar?: File | null;
	currency?: Currency;
	isLoading?: boolean;
	error?: string;
}

export interface SignupUser {
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	password: string;
	avatar: File | null;
	currency: Currency;
}
