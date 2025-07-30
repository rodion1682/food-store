import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ReviewItem.module.scss';
import { Review } from '../../model/types/review';
import { Text } from 'shared/ui/Text';
import { StarRating } from 'shared/ui/StarRating';
import { Skeleton } from 'shared/ui/Skeleton/ui/Skeleton';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/ui/Avatar';
import { AppLink } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ReviewItemProps {
	className?: string;
	review?: Review;
	isLoading?: boolean;
}

export const ReviewItem = memo((props: ReviewItemProps) => {
	const { className, review, isLoading } = props;
	const { t } = useTranslation('productDetails');

	if (isLoading) {
		return (
			<div className={classNames(cls.ReviewItem, {}, [className])}>
				<div className={cls.ReviewItem__header}>
					<div className={cls.ReviewItem__user}>
						<Skeleton border={'50%'} width={50} height={50} />
						<Skeleton width={220} height={32} />
					</div>
					<div className={cls.ReviewItem__data}>
						<Skeleton width={150} height={24} />
					</div>
				</div>
				<Skeleton
					className={cls.ReviewItem__rating}
					width={140}
					height={24}
				/>
				<Skeleton width={'100%'} height={48} />
			</div>
		);
	}

	return (
		<div className={classNames(cls.ReviewItem, {}, [className])}>
			<div className={cls.ReviewItem__header}>
				<AppLink
					to={`${RoutePath.profile}${review?.user?.id}`}
					className={cls.ReviewItem__user}
				>
					<Avatar
						className={cls.ReviewItem__avatar}
						src={review?.user?.avatar}
					/>
					<Text
						className={cls.ReviewItem__username}
						title={review?.user?.username}
					/>
				</AppLink>
				<div className={cls.ReviewItem__data}>
					<Text text={t('Posted on')} />
					<Text text={review?.created_at} />
				</div>
			</div>
			{review?.rating && (
				<StarRating
					className={cls.ReviewItem__rating}
					value={review?.rating}
				/>
			)}
			<Text text={review?.text} />
		</div>
	);
});
