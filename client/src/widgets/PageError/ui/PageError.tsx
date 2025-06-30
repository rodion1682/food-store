import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './PageError.module.scss';
import { Button } from 'shared/ui/Button';

interface PageErrorProps {
	className?: string;
}

export const PageError = memo(({ className }: PageErrorProps) => {
	const { t } = useTranslation();

	const reloadPage = () => {
		location.reload();
	};

	return (
		<div className={classNames(cls.PageError, {}, [className])}>
			<p>{t('An unexpected error occurred')}</p>
			<Button onClick={reloadPage}>{t('Reload page')}</Button>
		</div>
	);
});
