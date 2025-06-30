import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Filterbar.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button';
import ChevroneIcon from 'shared/assets/icons/chevrone.svg';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useTranslation } from 'react-i18next';
import { PriceRangeSlider } from 'shared/ui/PriceRangeSlider';

interface FilterbarProps {
	className?: string;
}

export const Filterbar = memo(({ className }: FilterbarProps) => {
	const { t } = useTranslation();
	const [colapsed, setCollapsed] = useState(false);

	const collapseHandler = () => {
		setCollapsed((prev) => !prev);
	};
	return (
		<div
			className={classNames(
				cls.Filterbar,
				{ [cls.Filterbar_colapsed]: colapsed },
				[className]
			)}
		>
			<Button
				className={classNames(
					cls.Filterbar__button,
					{ [cls.Filterbar__button_colapsed]: colapsed },
					[className]
				)}
				onClick={collapseHandler}
				theme={ButtonTheme.FILTERBAR_SWITCHER}
			>
				<SvgIcon children={<ChevroneIcon />} />
			</Button>
			<div>{t('Product filters')}</div>
			<PriceRangeSlider
				priceMin={0}
				priceMax={1000}
				onChange={(min, max) => console.log(min, max)}
			/>
		</div>
	);
});
