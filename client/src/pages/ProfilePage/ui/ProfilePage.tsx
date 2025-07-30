import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	fetchProfileData,
	getProfileError,
	getProfileForm,
	getProfileIsLoading,
	getProfileReadonly,
	getProfileValidateErrors,
	profileActions,
	ProfileCard,
	profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { CurrencySelect } from 'entities/Currency';
import { Text, TextTheme } from 'shared/ui/Text';
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile';
import { useTranslation } from 'react-i18next';
import { ImageInput } from 'shared/ui/Input';
import { useParams } from 'react-router-dom';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();
	const formData = useAppSelector(getProfileForm);
	const isLoading = useAppSelector(getProfileIsLoading);
	const error = useAppSelector(getProfileError);
	const readonly = useAppSelector(getProfileReadonly);
	const validateErrors = useAppSelector(getProfileValidateErrors);

	const { id: userId } = useParams<{ id: string }>();

	const validateErrorTranslates = {
		[ValidateProfileErrors.INCORRECT_USER_FIRSTNAME]: t(
			'First name is required'
		),
		[ValidateProfileErrors.INCORRECT_USER_LASTNAME]: t(
			'Last name is required'
		),
		[ValidateProfileErrors.INCORRECT_USERNAME]: t('User name is required'),
		[ValidateProfileErrors.INCORRECT_USER_EMAIL]: t('E-mail is not valid'),
		[ValidateProfileErrors.EMPTY_USER_EMAIL]: t('An email is required'),
		[ValidateProfileErrors.NO_DATA]: t('Form data is required'),
		[ValidateProfileErrors.SERVER_ERROR]: t('Update failed. Server error.'),
	};

	useEffect(() => {
		if (userId) {
			dispatch(fetchProfileData(userId));
		}
	}, [dispatch, userId]);

	const onChangeFirstname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ firstname: value || '' }));
		},
		[dispatch]
	);

	const onChangeLastname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ lastname: value || '' }));
		},
		[dispatch]
	);

	const onChangeUsername = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ username: value || '' }));
		},
		[dispatch]
	);

	const onChangeEmail = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ email: value || '' }));
		},
		[dispatch]
	);

	const onChangeCurrency = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ currency: value }));
		},
		[dispatch]
	);

	const onChangeAvatar = useCallback(
		(file: File) => {
			dispatch(profileActions.updateProfile({ updatedAvatarFile: file }));
			if (!file) return;

			const reader = new FileReader();

			reader.onloadend = () => {
				const preview = reader.result as string;
				dispatch(profileActions.updateProfile({ avatar: preview }));
			};

			reader.readAsDataURL(file);
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers} remvoeAfterUnmount>
			<div className={classNames(cls.ProfilePage, {}, [className])}>
				<div
					className={classNames(cls.ProfilePage__container, {}, [
						'_container',
					])}
				>
					<ProfilePageHeader readonly={readonly} />
					{validateErrors?.length && (
						<div className={cls.ProfilePage__errors}>
							{validateErrors.map((error) => (
								<Text
									key={error}
									theme={TextTheme.ERROR}
									text={validateErrorTranslates[error]}
								/>
							))}
						</div>
					)}
					<div className={cls.ProfilePage__content}>
						<div className={cls.ProfilePage__inputs}>
							<ProfileCard
								className={cls.ProfilePage__card}
								data={formData}
								isLoading={isLoading}
								error={error}
								readonly={readonly}
								onChangeFirstname={onChangeFirstname}
								onChangeLastname={onChangeLastname}
								onChangeUsername={onChangeUsername}
								onChangeEmail={onChangeEmail}
							/>
							<CurrencySelect
								selectedOption={formData?.currency}
								onChange={onChangeCurrency}
								readonly={readonly}
							/>
						</div>
						<div className={cls.ProfilePage__image}>
							<ImageInput
								name={'profile-picture'}
								placeholder={t('Select profile picture')}
								previewImage={formData?.avatar}
								onChange={onChangeAvatar}
								readonly={readonly}
							/>
						</div>
					</div>
				</div>
			</div>
		</DynamicModuleLoader>
	);
});

export default ProfilePage;
