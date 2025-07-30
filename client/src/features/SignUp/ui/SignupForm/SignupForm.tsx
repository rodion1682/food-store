import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './SignupForm.module.scss';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import {
	ChangeValue,
	ImageInput,
	Input,
	InputTheme,
	InputType,
} from 'shared/ui/Input';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getSignupData } from '../../model/selectors/getSignupData/getSignupData';
import { getSignupIsLoading } from '../../model/selectors/getSignupIsLoading/getSignupIsLoading';
import { getSignupError } from '../../model/selectors/getSignupError/getSignupError';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { signupActions, signupReducer } from '../../model/slices/signupSlice';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { signup } from 'features/SignUp/model/services/signup';
import { Currency } from 'entities/Currency';

export interface SignupFormProps {
	className?: string;
	onSuccess: () => void;
	toggleMode: () => void;
}

const initialReducers: ReducersList = {
	signupForm: signupReducer,
};

const SignupForm = memo((props: SignupFormProps) => {
	const { className, onSuccess, toggleMode } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const { firstname, lastname, username, email, password, avatar } =
		useAppSelector(getSignupData);
	const isLoading = useAppSelector(getSignupIsLoading);
	const error = useAppSelector(getSignupError);

	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const onChangeFirstname = useCallback(
		(value: ChangeValue) => {
			dispatch(signupActions.setFirstname(String(value)));
		},
		[dispatch]
	);

	const onChangeLastname = useCallback(
		(value: ChangeValue) => {
			dispatch(signupActions.setLastname(String(value)));
		},
		[dispatch]
	);

	const onChangeUsername = useCallback(
		(value: ChangeValue) => {
			dispatch(signupActions.setUsername(String(value)));
		},
		[dispatch]
	);

	const onChangeEmail = useCallback(
		(value: ChangeValue) => {
			dispatch(signupActions.setEmail(String(value)));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: ChangeValue) => {
			dispatch(signupActions.setPassword(String(value)));
		},
		[dispatch]
	);

	const onChangeAvatar = useCallback(
		(file: File) => {
			dispatch(signupActions.setAvatar(file));
		},
		[dispatch]
	);

	const onLoginSubmit = useCallback(async () => {
		const result = await dispatch(
			signup({
				firstname,
				lastname,
				username,
				email,
				password,
				avatar,
				currency: Currency.EURO,
			})
		);

		if (result.meta.requestStatus === 'fulfilled') {
			console.log('sucessful');

			onSuccess();
		}
	}, [dispatch, firstname, lastname, username, email, password, avatar]);

	return (
		<DynamicModuleLoader reducers={initialReducers} remvoeAfterUnmount>
			<div className={classNames(cls.SignupForm, {}, [className])}>
				<Text
					className={cls.SignupForm__title}
					title={t('Signup form')}
					align={TextAlign.CENTER}
				/>
				{error && (
					<Text
						text={t('You enter wrong email or password')}
						theme={TextTheme.ERROR}
					/>
				)}
				<div className={cls.SignupForm__body}>
					<div className={cls.SignupForm__inputs}>
						<Input
							label={t('Enter firstname')}
							autofocus
							value={firstname}
							onChange={onChangeFirstname}
							autocomplete={'firstname'}
						/>
						<Input
							label={t('Enter lastname')}
							value={lastname}
							onChange={onChangeLastname}
							autocomplete={'email'}
						/>
						<Input
							label={t('Enter username')}
							value={username}
							onChange={onChangeUsername}
							autocomplete={'username'}
						/>
						<Input
							label={t('Enter email')}
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
					</div>
					<ImageInput
						className={cls.SignupForm__image}
						placeholder={t('Select profile picture')}
						previewImage={previewImage}
						setPreviewImage={setPreviewImage}
						onChange={onChangeAvatar}
						name={'user-picture'}
					/>
				</div>
				<div className={cls.SignupForm__actions}>
					<Button
						className={cls.SignupForm__button}
						type={'submit'}
						disabled={isLoading}
						onClick={onLoginSubmit}
					>
						{t('Signup')}
					</Button>
					<Button
						className={cls.SignupForm__button}
						theme={ButtonTheme.ACTION_BORDER}
						onClick={toggleMode}
					>
						{t('I already have an account!')}
					</Button>
				</div>
			</div>
		</DynamicModuleLoader>
	);
});

export default SignupForm;
