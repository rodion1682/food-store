import { memo, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProductDetails.module.scss';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { productDetailsReducer } from '../../model/slice/productDetailsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductById } from '../../model/services/fetchProductById/fetchProductById';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getProductIsLoading } from '../../model/selectors/getProductIsLoading/getProductIsLoading';
import { getProductData } from '../../model/selectors/getProductData/getProductData';
import { getProductError } from '../../model/selectors/getProductError/getProductError';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { Skeleton } from 'shared/ui/Skeleton/ui/Skeleton';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import CartIcon from 'shared/assets/icons/cart.svg';
import WishlistIcon from 'shared/assets/icons/wishlist.svg';
import { Counter } from 'shared/ui/Counter';
import { useDiscountPercent } from 'shared/lib/hooks/useDiscountPercent/useDiscountPercent';
import { StarRating } from 'shared/ui/StarRating';

interface ProductDetailsProps {
	className?: string;
	id: number;
}

const reducers: ReducersList = {
	productDetails: productDetailsReducer,
};

export const ProductDetails = memo((props: ProductDetailsProps) => {
	const { className, id } = props;
	const { t } = useTranslation('productDetails');
	const dispatch = useAppDispatch();
	const [cartItemCount, setCartItemCount] = useState(1);

	const increaseCartCouten = () => {
		setCartItemCount((prev) => prev + 1);
	};

	const decreaseCartCouten = () => {
		if (cartItemCount > 1 && cartItemCount !== 1) {
			setCartItemCount((prev) => prev - 1);
		}
	};

	const product = useAppSelector(getProductData);
	const isLoading = useAppSelector(getProductIsLoading);
	const error = useAppSelector(getProductError);

	console.log('product', product);

	useEffect(() => {
		dispatch(fetchProductById(id));
	}, [dispatch, id]);

	const discountPercent = useDiscountPercent(
		product?.price,
		product?.sale_price
	);
	let content;

	if (isLoading) {
		content = (
			<div className={cls.ProductDetails__body}>
				<Skeleton paddingBottom={'50%'} width={'60%'} />
				<div className={cls.ProductDetails__content}>
					<Skeleton
						className={cls.ProductDetails__title}
						height={32}
						width={150}
					/>
					<Skeleton
						className={cls.ProductDetails__title}
						height={25}
						width={195}
					/>
					<div className={cls.ProductDetails__price}>
						<Skeleton height={40} width={100} />
					</div>
					<div className={cls.ProductDetails__actions}>
						<Skeleton height={44} width={'30%'} />
						<Skeleton height={44} width={'30%'} />
						<Skeleton height={44} width={'30%'} />
					</div>
					<div className={cls.ProductDetails__views}>
						<Skeleton height={24} width={160} />
					</div>
				</div>
			</div>
		);
	} else if (error) {
		content = (
			<Text
				theme={TextTheme.ERROR}
				align={TextAlign.CENTER}
				title={t('An error occurred while loading the product')}
			/>
		);
	} else {
		content = (
			<div className={cls.ProductDetails__body}>
				<div
					className={classNames(cls.ProductDetails__image, {}, ['_ibg'])}
				>
					<Text
						className={cls.ProductDetails__discountPercent}
						theme={TextTheme.DISCOUNT_PERCENT}
						text={discountPercent}
					/>
					<img src={product?.image_1} alt={product?.title} />
				</div>
				<div className={cls.ProductDetails__content}>
					<Text
						className={cls.ProductDetails__title}
						title={product?.title}
					/>
					<StarRating
						value={product?.product_rating_average}
						average={product?.product_rating_average}
						total={product?.product_rating_total}
						totalTextBefore={t('Based on')}
						totalTextAfter={t('reviews')}
					/>
					<Text
						className={cls.ProductDetails__subtitle}
						text={product?.subtitle}
					/>
					{product?.sale ? (
						<div className={cls.ProductDetails__price}>
							<Text
								theme={TextTheme.SELE_PRICE}
								text={product?.sale_price}
							/>
							<Text theme={TextTheme.OLD_PRICE} text={product?.price} />
						</div>
					) : (
						<div className={cls.ProductDetails__price}>
							<Text theme={TextTheme.PRICE} text={product?.price} />
						</div>
					)}
					<div className={cls.ProductDetails__actions}>
						<Counter
							value={cartItemCount}
							onIncrease={increaseCartCouten}
							onDecrease={decreaseCartCouten}
						/>
						<Button
							className={cls.ProductDetails__button}
							theme={ButtonTheme.ACTION}
						>
							<SvgIcon children={<CartIcon />} />
							{t('Add to cart')}
						</Button>
						<Button
							className={cls.ProductDetails__button}
							theme={ButtonTheme.ACTION_BORDER}
						>
							<SvgIcon children={<WishlistIcon />} />
							{t('Add to wishlist')}
						</Button>
					</div>
					<div className={cls.ProductDetails__views}>
						<Text text={t('Product viewed:')} />
						<Text text={product?.views} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} remvoeAfterUnmount={true}>
			<div className={classNames(cls.ProductDetails, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	);
});
