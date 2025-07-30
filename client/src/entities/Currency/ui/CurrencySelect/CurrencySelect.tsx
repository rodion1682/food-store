import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select, SelectTheme } from 'shared/ui/Select';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
	className?: string;
	selectedOption?: string;
	onChange?: (value: Currency) => void;
	readonly?: boolean;
}

const options = [Currency.EURO, Currency.USD];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
	const { className, selectedOption, onChange, readonly } = props;
	const { t } = useTranslation('profile');

	const onChangeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Currency);
		},
		[onChange]
	);

	return (
		<div className={classNames('', {}, [className])}>
			<Select
				placeholder={t('Currency')}
				selectedOption={selectedOption}
				options={options}
				onChange={onChangeHandler}
				readonly={readonly}
			/>
		</div>
	);
});
