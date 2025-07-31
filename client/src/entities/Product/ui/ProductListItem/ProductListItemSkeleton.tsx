import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProductListItem.module.scss';
import { Skeleton } from 'shared/ui/Skeleton/ui/Skeleton';

interface ProductListItemSkeletonProps {
	className?: string;
}

export const ProductListItemSkeleton = memo(
	(props: ProductListItemSkeletonProps) => {
		const { className } = props;

		return (
			<div className={classNames(cls.ProductListItem, {}, [className])}>
				<div className={cls.ProductListItem__skeletonInner}>
					<div className={cls.ProductListItem__skeletonImage}>
						<Skeleton paddingBottom={'90%'} width={'100%'} />
					</div>
					<Skeleton
						className={cls.ProductListItem__skeletonTitle}
						height={32}
						width={190}
					/>
					<div className={cls.ProductListItem__bottom}>
						<Skeleton
							className={cls.ProductListItem__skeletonRating}
							height={24}
							width={150}
						/>
						<div className={cls.ProductListItem__price}>
							<Skeleton height={40} width={110} />
						</div>
					</div>
				</div>
			</div>
		);
	}
);
