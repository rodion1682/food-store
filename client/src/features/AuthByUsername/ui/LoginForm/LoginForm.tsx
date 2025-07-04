import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './LoginForm.module.scss';
import { Input, InputTheme, InputType } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { useSelector, useStore } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
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

	const username = useAppSelector(getLoginUsername);
	const password = useAppSelector(getLoginPassword);
	const isLoading = useAppSelector(getLoginIsLoading);
	const error = useAppSelector(getLoginError);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch]
	);

	const onLoginSubmit = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));

		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
		}
	}, [dispatch, username, password]);

	return (
		<DynamicModuleLoader reducers={initialReducers} remvoeAfterUnmount>
			<div className={classNames(cls.LoginForm, {}, [className])}>
				<Text title={t('Login form')} />
				{error && (
					<Text
						text={t('You enter wrong username or password')}
						theme={TextTheme.ERROR}
					/>
				)}
				<Input
					label={t('Enter username')}
					autofocus
					value={username}
					onChange={onChangeUsername}
				/>
				<Input
					label={t('Enter password')}
					type={InputType.PASSWORD}
					theme={InputTheme.PASSWORD_INPUT}
					value={password}
					onChange={onChangePassword}
				/>
				<Button
					className={cls.LoginForm__button}
					onClick={onLoginSubmit}
					disabled={isLoading}
				>
					{t('Login')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
