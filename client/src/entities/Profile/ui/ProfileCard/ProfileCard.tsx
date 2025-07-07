import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProfileCard.module.scss';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { Input, InputTheme } from 'shared/ui/Input';
import { Profile } from '../../model/types/profile';
import { Loader } from 'shared/ui/Loader';
import { Select } from 'shared/ui/Select';
import { Currency } from 'entities/Currency';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstname: (value?: string) => void;
	onChangeLastname: (value?: string) => void;
	onChangeUsername: (value?: string) => void;
	onChangeEmail: (value?: string) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
	const {
		className,
		data,
		isLoading,
		error,
		readonly,
		onChangeFirstname,
		onChangeLastname,
		onChangeUsername,
		onChangeEmail,
	} = props;
	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<div
				className={classNames(cls.ProfileCard, {}, [
					className,
					cls.ProfileCard_loading,
				])}
			>
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div
				className={classNames(cls.ProfileCard, {}, [
					className,
					cls.ProfileCard_error,
				])}
			>
				<Text
					align={TextAlign.CENTER}
					theme={TextTheme.ERROR}
					title={t('An error occurred while loading the profile')}
					text={t('Try to reload the page')}
				/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			<div className={cls.ProfileCard__data}>
				<Input
					value={data?.firstname}
					label={t('First name')}
					theme={InputTheme.SECONDARY}
					readonly={readonly}
					onChange={(val) => onChangeFirstname(String(val))}
				/>
				<Input
					value={data?.lastname}
					label={t('Last name')}
					theme={InputTheme.SECONDARY}
					readonly={readonly}
					onChange={(val) => onChangeLastname(String(val))}
				/>
				<Input
					value={data?.username}
					label={t('Username')}
					theme={InputTheme.SECONDARY}
					readonly={readonly}
					onChange={(val) => onChangeUsername(String(val))}
				/>
				<Input
					value={data?.email}
					label={t('Email')}
					theme={InputTheme.SECONDARY}
					readonly={readonly}
					onChange={(val) => onChangeEmail(String(val))}
				/>
				<Currency selectedCurency={data?.currency} />
			</div>
		</div>
	);
});
