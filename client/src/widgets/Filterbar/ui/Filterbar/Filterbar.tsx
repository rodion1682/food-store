import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Filterbar.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button';
import ChevroneIcon from 'shared/assets/icons/chevrone.svg';
import { SvgIcon } from 'shared/ui/SvgIcon';
import { useTranslation } from 'react-i18next';
import { PriceRangeSlider } from 'shared/ui/PriceRangeSlider';

interface FilterbarProps {
	className?: string;
	collapsed: boolean;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Filterbar = memo((props: FilterbarProps) => {
	const { className, collapsed, setCollapsed } = props;
	const { t } = useTranslation();
	const collapseHandler = () => {
		setCollapsed((prev) => !prev);
	};
	return (
		<div
			className={classNames(
				cls.Filterbar,
				{ [cls.Filterbar_collapsed]: collapsed },
				[className]
			)}
		>
			<Button
				className={classNames(
					cls.Filterbar__button,
					{ [cls.Filterbar__button_collapsed]: collapsed },
					[className]
				)}
				onClick={collapseHandler}
				theme={ButtonTheme.FILTERBAR_SWITCHER}
			>
				<SvgIcon children={<ChevroneIcon />} />
			</Button>
			<div className={cls.Filterbar__body}>
				<div>{t('Product filters')}</div>
				<PriceRangeSlider
					priceMin={0}
					priceMax={1000}
					onChange={(min, max) => console.log(min, max)}
				/>
			</div>
		</div>
	);
});
