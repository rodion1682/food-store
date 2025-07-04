import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProfilePage.module.scss';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
	const { t } = useTranslation();
	return (
		<DynamicModuleLoader reducers={reducers} remvoeAfterUnmount>
			<div className={classNames(cls.ProfilePage, {}, [className])}>
				<div>Profile page</div>
			</div>
		</DynamicModuleLoader>
	);
});

export default ProfilePage;
