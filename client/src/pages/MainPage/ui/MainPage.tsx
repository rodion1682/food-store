import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './MainPage.module.scss';

interface MainPageProps {
	className?: string;
}

export const MainPage = memo(({ className }: MainPageProps) => {
	const { t } = useTranslation('main');
	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<div> {t('Main Page')}</div>
		</div>
	);
});

export default MainPage;
