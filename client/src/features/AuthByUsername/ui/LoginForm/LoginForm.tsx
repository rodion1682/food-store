import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './LoginForm.module.scss';
import { ChangeValue, Input, InputTheme, InputType } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByEmail } from 'features/AuthByUsername/model/services/loginByEmail/loginByEmail';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
	const { className, onSuccess } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const email = useAppSelector(getLoginEmail);
	const password = useAppSelector(getLoginPassword);
	const isLoading = useAppSelector(getLoginIsLoading);
	const error = useAppSelector(getLoginError);

	const onChangeEmail = useCallback(
		(value: ChangeValue) => {
			dispatch(loginActions.setEmail(String(value)));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: ChangeValue) => {
			dispatch(loginActions.setPassword(String(value)));
		},
		[dispatch]
	);

	const onLoginSubmit = useCallback(async () => {
		const result = await dispatch(loginByEmail({ email, password }));

		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
		}
	}, [dispatch, email, password]);

	return (
		<DynamicModuleLoader reducers={initialReducers} remvoeAfterUnmount>
			<div className={classNames(cls.LoginForm, {}, [className])}>
				<Text title={t('Login form')} />
				{error && (
					<Text
						text={t('You enter wrong email or password')}
						theme={TextTheme.ERROR}
					/>
				)}
				<Input
					label={t('Enter email')}
					autofocus
					value={email}
					onChange={onChangeEmail}
					autocomplete={'email'}
				/>
				<Input
					label={t('Enter password')}
					type={InputType.PASSWORD}
					theme={InputTheme.PASSWORD_INPUT}
					value={password}
					onChange={onChangePassword}
					autocomplete={'current-password'}
				/>
				<Button
					className={cls.LoginForm__button}
					type={'submit'}
					disabled={isLoading}
					onClick={onLoginSubmit}
				>
					{t('Login')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
