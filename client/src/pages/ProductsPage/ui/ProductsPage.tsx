import { Filterbar } from 'widgets/Filterbar';
import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProductsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { ProductList } from 'entities/Product';

interface ProductsPageProps {
	className?: string;
}

const products = [
	{
		id: 1,
		title: 'Grape',
		image_1:
			'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
		sale: true,
		price: 500,
		sale_price: 400,
		product_rating_average: 4.17,
		product_rating_total: 500,
	},
	{
		id: 2,
		title: 'Grape will have very long title for testing',
		image_1:
			'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
		price: 300,
		product_rating_average: 3.5,
		product_rating_total: 200,
	},
	{
		id: 3,
		title: 'Grape 3',
		image_1:
			'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
		price: 19.98,
		product_rating_average: 4,
		product_rating_total: 25,
	},
	{
		id: 4,
		title: 'Grape 4',
		image_1:
			'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
		price: 19.98,
		product_rating_average: 1.78,
		product_rating_total: 24789,
	},
	{
		id: 5,
		title: 'Grape 5',
		image_1:
			'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
		sale: true,
		price: 19.99,
		sale_price: 18.76,
		product_rating_average: 5,
		product_rating_total: 15,
	},
];

const ProductsPage = memo(({ className }: ProductsPageProps) => {
	const { t } = useTranslation('products');
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className={classNames(cls.ProductsPage, {}, [className])}>
			<div
				className={classNames(cls.ProductsPage__container, {}, [
					'_container',
				])}
			>
				<Filterbar collapsed={collapsed} setCollapsed={setCollapsed} />
				<div className={cls.ProductsPage__content}>
					{t('Products Page')}
					<ProductList products={products} collapsed={collapsed} />
				</div>
			</div>
		</div>
	);
});

export default ProductsPage;
