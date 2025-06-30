import { Filterbar } from 'widgets/Filterbar';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProductsPage.module.scss';
import { useTranslation } from 'react-i18next';

interface ProductsPageProps {
	className?: string;
}

const ProductsPage = memo(({ className }: ProductsPageProps) => {
	const { t } = useTranslation('products');
	return (
		<div className={classNames(cls.ProductsPage, {}, [className])}>
			<Filterbar />
			<div className={cls.ProductsPage__content}>{t('Products Page')}</div>
		</div>
	);
});

export default ProductsPage;
