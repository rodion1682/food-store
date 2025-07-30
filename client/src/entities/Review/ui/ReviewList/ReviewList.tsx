import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ReviewList.module.scss';
import { Review } from '../../model/types/review';
import { Text } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { ReviewItem } from '../ReviewItem/ReviewItem';

interface ReviewListProps {
	className?: string;
	reviews?: Review[];
	isLoading?: boolean;
}

export const ReviewList = memo((props: ReviewListProps) => {
	const { className, reviews, isLoading } = props;
	const { t } = useTranslation('productDetails');

	if (isLoading) {
		return (
			<div className={classNames(cls.ReviewList, {}, [className])}>
				<ReviewItem className={cls.ReviewList__review} isLoading />
				<ReviewItem className={cls.ReviewList__review} isLoading />
				<ReviewItem className={cls.ReviewList__review} isLoading />
			</div>
		);
	}

	if (!reviews) {
		return null;
	}

	return (
		<div className={classNames(cls.ReviewList, {}, [className])}>
			{reviews?.length ? (
				reviews.map((review) => (
					<ReviewItem
						key={review.id}
						className={cls.ReviewList__review}
						review={review}
						isLoading={isLoading}
					/>
				))
			) : (
				<Text text={t('This product has no reviews')} />
			)}
		</div>
	);
});
