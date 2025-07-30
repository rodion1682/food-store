import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './AddNewReviewForm.module.scss';
import { ChangeValue, Input, InputTheme } from 'shared/ui/Input';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { StarRating } from 'shared/ui/StarRating';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getAddNewReviewData } from '../../model/selectors/getAddNewReviewData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	addNewReviewActions,
	addNewReviewReducer,
} from '../../model/slices/addNewReviewSlice';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from 'shared/ui/Text';

export interface AddNewReviewFormProps {
	className?: string;
	onSendReview: (text: string, rating: number) => void;
}

const reducers: ReducersList = {
	addNewReview: addNewReviewReducer,
};

const AddNewReviewForm = memo((props: AddNewReviewFormProps) => {
	const { className, onSendReview } = props;
	const { t } = useTranslation();
	const reviewData = useAppSelector(getAddNewReviewData);
	const dispatch = useAppDispatch();

	if (!reviewData) return null;

	const { rating, text, error } = reviewData;

	const isFormValid = rating! > 0 && !!text?.trim();

	const onReviewRatingChange = useCallback(
		(value: number) => {
			dispatch(addNewReviewActions.setRating(value));
		},
		[dispatch]
	);

	const onReviewTextChange = useCallback(
		(value: ChangeValue) => {
			dispatch(addNewReviewActions.setText(String(value)));
		},
		[dispatch]
	);

	const onAddNewReview = useCallback(() => {
		if (isFormValid) {
			if (text && rating) {
				onSendReview(text, rating);
			}

			dispatch(addNewReviewActions.setText(''));
			dispatch(addNewReviewActions.setRating(0));
		}
	}, [dispatch, onSendReview, text, rating]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.AddNewReviewForm, {}, [className])}>
				<div className={cls.AddNewReviewForm__header}>
					<Text title={t('Leave a review for the product')} />
					<Button
						theme={ButtonTheme.ACTION}
						disabled={!isFormValid}
						onClick={onAddNewReview}
					>
						{t('Send review')}
					</Button>
				</div>
				<div className={cls.AddNewReviewForm__rating}>
					<StarRating
						value={rating}
						editable={true}
						onSelect={onReviewRatingChange}
						showRatingGrade={true}
						width={32}
						height={32}
					/>
				</div>
				<Input
					label={t('Enter reviews text')}
					value={text}
					onChange={onReviewTextChange}
					textarea={true}
					theme={InputTheme.TEXTAREA}
					height={100}
				/>
			</div>
		</DynamicModuleLoader>
	);
});

export default AddNewReviewForm;
