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
	profileActions,
	ProfileCard,
	profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { currencyReducer, fetchCurrencyData } from 'entities/Currency';

const reducers: ReducersList = {
	profile: profileReducer,
	currency: currencyReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
	const dispatch = useAppDispatch();
	const formData = useAppSelector(getProfileForm);
	const isLoading = useAppSelector(getProfileIsLoading);
	const error = useAppSelector(getProfileError);
	const readonly = useAppSelector(getProfileReadonly);

	const raw = localStorage.getItem(USER_LOCALSTORAGE_KEY);
	const email = raw ? JSON.parse(raw).email : null;

	useEffect(() => {
		if (email) {
			dispatch(fetchProfileData(email));
			dispatch(fetchCurrencyData());
		}
	}, [dispatch, email]);

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

	return (
		<DynamicModuleLoader reducers={reducers} remvoeAfterUnmount>
			<div className={classNames(cls.ProfilePage, {}, [className])}>
				<div
					className={classNames(cls.ProfilePage__container, {}, [
						'_container',
					])}
				>
					<ProfilePageHeader readonly={readonly} />
					<ProfileCard
						data={formData}
						isLoading={isLoading}
						error={error}
						readonly={readonly}
						onChangeFirstname={onChangeFirstname}
						onChangeLastname={onChangeLastname}
						onChangeUsername={onChangeUsername}
						onChangeEmail={onChangeEmail}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	);
});

export default ProfilePage;
