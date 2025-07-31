import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProductListItem.module.scss';
import { Product } from '../../model/types/product';
import { Text, TextTheme } from 'shared/ui/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useDiscountPercent } from 'shared/lib/hooks/useDiscountPercent/useDiscountPercent';
import { StarRating } from 'shared/ui/StarRating';
import { AppLink } from 'shared/ui/AppLink';

interface ProductListItemProps {
	className?: string;
	product: Product;
	currencySymbol: string;
}

export const ProductListItem = memo((props: ProductListItemProps) => {
	const { className, product, currencySymbol } = props;
	const { t } = useTranslation();

	const discountPercent = useDiscountPercent(
		product?.price,
		product?.sale_price
	);

	return (
		<AppLink
			className={classNames(cls.ProductListItem, {}, [className])}
			to={'http://localhost:3000/products'}
		>
			<div className={cls.ProductListItem__inner}>
				<div
					className={classNames(cls.ProductListItem__image, {}, ['_ibg'])}
				>
					<img src={product.image_1} alt={product.title} />
					{product?.sale_price && (
						<Text
							className={cls.ProductListItem__discountPercent}
							theme={TextTheme.DISCOUNT_PERCENT}
							text={discountPercent}
						/>
					)}
					<Button
						className={cls.ProductListItem__addCart}
						theme={ButtonTheme.ACTION}
					>
						Add to Cart
					</Button>
				</div>
				<Text
					className={cls.ProductListItem__title}
					title={product.title}
				/>
				<div className={cls.ProductListItem__bottom}>
					<StarRating
						className={cls.ProductListItem__rating}
						average={product.product_rating_average}
						total={product.product_rating_total}
						height={18}
						width={18}
					/>
					{product?.sale ? (
						<div className={cls.ProductListItem__price}>
							<Text
								theme={TextTheme.SELE_PRICE}
								text={`${product?.sale_price} ${currencySymbol}`}
							/>
							<Text
								theme={TextTheme.OLD_PRICE}
								text={`${product?.price} ${currencySymbol}`}
							/>
						</div>
					) : (
						<div className={cls.ProductListItem__price}>
							<Text
								theme={TextTheme.PRICE}
								text={`${product?.price} ${currencySymbol}`}
							/>
						</div>
					)}
				</div>
			</div>
		</AppLink>
	);
});
