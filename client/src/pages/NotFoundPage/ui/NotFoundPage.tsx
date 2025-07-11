import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
	className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
	const { t } = useTranslation();
	return (
		<div className={classNames(cls.NotFoundPage, {}, [className])}>
			<div>{t("Couldn't find the page")}</div>
		</div>
	);
});
