import { classNames } from 'shared/lib/classNames/classNames';
import StarIcon from 'shared/assets/icons/star.svg';
import cls from './StarRating.module.scss';
import { Text } from '../Text';
import { CSSProperties, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface StarRatingProps {
	className?: string;
	value?: number;
	max?: number;
	average?: number;
	total?: number;
	title?: number;
	totalTextBefore?: string;
	totalTextAfter?: string;
	onSelect?: (value: number) => void;
	editable?: boolean;
	showRatingGrade?: boolean;
	height?: string | number;
	width?: string | number;
}

export function StarRating(props: StarRatingProps) {
	const {
		className,
		value = 0,
		max = 5,
		total,
		average,
		title,
		totalTextBefore,
		totalTextAfter,
		onSelect,
		editable = false,
		showRatingGrade = false,
		height = 24,
		width = 24,
	} = props;
	const { t } = useTranslation('productDetails');
	const [hoveredStar, setHoveredStar] = useState<number | null>(null);
	const [selectedStar, setSelectedStar] = useState<number>(value);

	useEffect(() => {
		if (editable) {
			setSelectedStar(value);
		}
	}, [value, editable]);

	const displayValue =
		hoveredStar !== null
			? hoveredStar
			: editable
			? selectedStar
			: average ?? value;

	const handleMouseEnter = (index: number) => {
		if (editable) setHoveredStar(index);
	};

	const handleMouseLeave = () => {
		if (editable) setHoveredStar(null);
	};

	const handleClick = (index: number) => {
		if (editable) {
			setSelectedStar(index);
			onSelect?.(index);
		}
	};

	const ratingTextMap: Record<number, string> = {
		1: t('Poor'),
		2: t('Fair'),
		3: t('Average'),
		4: t('Good'),
		5: t('Great!'),
	};

	const currentText = ratingTextMap[displayValue] || '';

	const styles: CSSProperties = {
		height,
		width,
		cursor: editable ? 'pointer' : 'default',
	};

	return (
		<div className={classNames(cls.StarRating, {}, [className])}>
			{title && <Text className={cls.StarRating__average} title={title} />}
			{[...Array(max)].map((_, i) => {
				const starNumber = i + 1;
				let fill = 0;

				if (displayValue >= starNumber) fill = 1;
				else if (displayValue > i) fill = displayValue - i;

				return (
					<span
						key={i}
						className={cls.StarRating__star}
						onMouseEnter={() => handleMouseEnter(starNumber)}
						onMouseLeave={handleMouseLeave}
						onClick={() => handleClick(starNumber)}
						style={styles}
					>
						<span className={cls.StarRating__starBg}>
							<StarIcon />
						</span>
						<span
							className={cls.StarRating__starFg}
							style={{ ['--star-fill' as string]: `${fill * 100}%` }}
						>
							<StarIcon />
						</span>
					</span>
				);
			})}
			{showRatingGrade && displayValue > 0 && (
				<Text className={cls.StarRating__ratingGrade} title={currentText} />
			)}
			{total && (
				<div className={cls.StarRating__bottom}>
					<Text
						text={
							totalTextBefore && totalTextAfter
								? `${totalTextBefore} ${total} ${totalTextAfter}`
								: String(total)
						}
					/>
				</div>
			)}
		</div>
	);
}
