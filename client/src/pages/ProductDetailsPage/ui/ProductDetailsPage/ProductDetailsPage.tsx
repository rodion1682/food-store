import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ProductDetailsPage.module.scss';
import { ProductDetails } from 'entities/Product';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text';
import { ReviewList } from 'entities/Review';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	getProductReviews,
	productDetailReviewsReducer,
} from '../../model/slices/productDetailReviewsSlice';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getProductDetailsReviewIsLoading } from '../../model/selectors/reviews/getProductDetailsReviewIsLoading';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchReviewsByProductId } from '../../model/services/fetchReviewsByProductId/fetchReviewsByProductId';
import { AddNewReviewForm } from 'features/addNewReview';
import { addReviewForProduct } from '../../model/services/addReviewForProduct/addReviewForProduct';

interface ProductDetailsPageProps {
	className?: string;
}

const reducerList: ReducersList = {
	productDetailsReviews: productDetailReviewsReducer,
};

const ProductDetailsPage = memo(({ className }: ProductDetailsPageProps) => {
	const { t } = useTranslation('productDetails');
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const reviews = useAppSelector(getProductReviews.selectAll);
	const reviewsIsLoading = useAppSelector(getProductDetailsReviewIsLoading);

	const onSendReview = useCallback(
		(text: string, rating: number) => {
			dispatch(addReviewForProduct({ text, rating }));
		},
		[dispatch]
	);

	useEffect(() => {
		dispatch(fetchReviewsByProductId(id));
	}, [dispatch, id]);

	if (!id) {
		return (
			<div className={classNames(cls.ProductDetailsPage, {}, [className])}>
				{t('Product could not be found')}
			</div>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducerList} remvoeAfterUnmount>
			<div className={classNames(cls.ProductDetailsPage, {}, [className])}>
				<div
					className={classNames(cls.ProductDetailsPage__container, {}, [
						'_container',
					])}
				>
					<ProductDetails id={Number(id)} />
					<AddNewReviewForm
						className={cls.ProductDetailsPage__addReview}
						onSendReview={onSendReview}
					/>
					<Text
						className={cls.ProductDetailsPage__title}
						title={t('Product reviews')}
					/>
					<ReviewList reviews={reviews} isLoading={reviewsIsLoading} />
				</div>
			</div>
		</DynamicModuleLoader>
	);
});

export default ProductDetailsPage;
