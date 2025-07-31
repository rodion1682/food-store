import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProductList.module.scss';
import { Product } from '../../model/types/product';
import { ProductListItem } from '../ProductListItem/ProductListItem';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localStorage';
import { ProductListItemSkeleton } from '../ProductListItem/ProductListItemSkeleton';

interface ProductListProps {
	className?: string;
	products?: Product[];
	isLoading?: boolean;
	collapsed?: boolean;
}

const getSkeletons = () => {
	return new Array(16)
		.fill(0)
		.map((item, index) => <ProductListItemSkeleton key={index} />);
};

export const ProductList = memo((props: ProductListProps) => {
	const { className, products, isLoading, collapsed } = props;
	const { t } = useTranslation();

	const userData = JSON.parse(
		localStorage.getItem(USER_LOCALSTORAGE_KEY) || '{}'
	);
	const currencySymbol = userData.currency === 'USD' ? '$' : '€';

	const renderProduct = (product: Product) => {
		return (
			<ProductListItem
				key={product.id}
				product={product}
				currencySymbol={currencySymbol}
			/>
		);
	};

	if (isLoading) {
		return (
			<div
				className={classNames(
					cls.ProductList,
					{ [cls.ProductList_collapsed]: collapsed },
					[className]
				)}
			>
				{getSkeletons()}
			</div>
		);
	}

	if (!products) {
		return null;
	}

	return (
		<div
			className={classNames(
				cls.ProductList,
				{ [cls.ProductList_collapsed]: collapsed },
				[className]
			)}
		>
			{products.length > 0 ? products?.map(renderProduct) : null}
		</div>
	);
});
