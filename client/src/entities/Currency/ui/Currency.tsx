import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Currency.module.scss';
import { Select } from 'shared/ui/Select';
import { getCurrenyData } from '../model/selectors/getCurrenyData/getCurrenyData';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getCurrenyIsLoading } from '../model/selectors/getCurrenyIsLoading/getCurrenyIsLoading';
import { getCurrenyError } from '../model/selectors/getCurrenyError/getCurrenyError';
import { Loader } from 'shared/ui/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { getProfileReadonly, profileActions } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface CurrencyProps {
	className?: string;
	selectedCurency?: string;
}

export const Currency = memo((props: CurrencyProps) => {
	const { className, selectedCurency } = props;
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();
	const data = useAppSelector(getCurrenyData);
	const isLoading = useAppSelector(getCurrenyIsLoading);
	const error = useAppSelector(getCurrenyError);
	const readonly = useAppSelector(getProfileReadonly);

	const onChangeCurrency = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ currency: value }));
		},
		[dispatch]
	);

	if (isLoading) {
		<div className={classNames(cls.Currency, {}, [className])}>
			<Loader />
		</div>;
	}

	if (error) {
		return (
			<div className={classNames(cls.Currency, {}, [className])}>
				<Text
					align={TextAlign.CENTER}
					theme={TextTheme.ERROR}
					title={t('Failed to load the currency')}
					text={t('Try to reload the page')}
				/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.Currency, {}, [className])}>
			<Select
				placeholder={t('Currency')}
				selectedOption={selectedCurency}
				options={data}
				onChange={onChangeCurrency}
				readonly={readonly}
			/>
		</div>
	);
});
