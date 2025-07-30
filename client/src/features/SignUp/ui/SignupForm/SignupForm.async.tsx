import { FC, lazy } from 'react';
import { SignupFormProps } from './SignupForm';

export const SignupFormAsync = lazy<FC<SignupFormProps>>(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			setTimeout(() => resolve(import('./SignupForm')), 1500);
		})
);
