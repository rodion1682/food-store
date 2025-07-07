import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProfilePageHeader.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions, updateProfileData } from 'entities/Profile';

interface ProfilePageHeaderProps {
	className?: string;
	readonly?: boolean;
}

export const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
	const { className, readonly } = props;
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();

	const handleEditProfile = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const handleCancelEditProfile = useCallback(() => {
		dispatch(profileActions.cancelEditProfile());
	}, [dispatch]);

	const handleSaveProfileChanges = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch]);

	return (
		<div className={classNames(cls.ProfilePageHeader, {}, [className])}>
			<Text
				title={
					readonly ? t('Profile') : t('You are able to edit your profile')
				}
			/>
			{readonly ? (
				<Button onClick={handleEditProfile}>{t('Edit profile')}</Button>
			) : (
				<div className={cls.ProfilePageHeader__actions}>
					<Button
						onClick={handleCancelEditProfile}
						theme={ButtonTheme.RED}
					>
						{t('Cancel changes')}
					</Button>
					<Button
						onClick={handleSaveProfileChanges}
						theme={ButtonTheme.GREEN}
					>
						{t('Save changes')}
					</Button>
				</div>
			)}
		</div>
	);
});
