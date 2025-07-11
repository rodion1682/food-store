import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';
import { Loader } from 'shared/ui/Loader';

interface PageLoaderProps {
	className?: string;
}

export const PageLoader = memo(({ className }: PageLoaderProps) => {
	return (
		<div className={classNames(cls.PageLoader, {}, [className])}>
			<Loader />
		</div>
	);
});
