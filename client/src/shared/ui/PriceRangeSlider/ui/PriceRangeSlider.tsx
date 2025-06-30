import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PriceRangeSlider.module.scss';
import { Input, InputTheme, InputType } from 'shared/ui/Input/ui/Input';

interface PriceRangeSliderProps {
	className?: string;
	priceMin: number;
	priceMax: number;
	onChange?: (min: number, max: number) => void;
}

export const PriceRangeSlider = memo((props: PriceRangeSliderProps) => {
	const { className, priceMin, priceMax, onChange } = props;

	const [rangeMin, setRangeMin] = useState(priceMin);
	const [rangeMax, setRangeMax] = useState(priceMax);
	const [inputMin, setInputMin] = useState(String(priceMin));
	const [inputMax, setInputMax] = useState(String(priceMax));

	const rangeRef = useRef<HTMLDivElement>(null);

	const valueToPercent = useCallback(
		(v: number) => ((v - priceMin) / (priceMax - priceMin)) * 100,
		[priceMin, priceMax]
	);

	useEffect(() => {
		if (!rangeRef.current) return;
		rangeRef.current.style.left = `${valueToPercent(rangeMin)}%`;
		rangeRef.current.style.right = `${100 - valueToPercent(rangeMax)}%`;
	}, [rangeMin, rangeMax, valueToPercent]);

	useEffect(
		() => onChange?.(rangeMin, rangeMax),
		[rangeMin, rangeMax, onChange]
	);

	const handleRangeMin = useCallback(
		(val: number) => {
			if (Number.isNaN(val)) return;
			const clamped = Math.min(val, rangeMax - 1);
			setRangeMin(clamped);
			setInputMin(String(clamped));
		},
		[rangeMax]
	);

	const handleRangeMax = useCallback(
		(val: number) => {
			if (Number.isNaN(val)) return;
			const clamped = Math.max(val, rangeMin + 1);
			setRangeMax(clamped);
			setInputMax(String(clamped));
		},
		[rangeMin]
	);

	const handleInputMin = useCallback(
		(val: number) => {
			const newVal = val;
			const newValStr = String(val);

			if (newValStr === '0') {
				setInputMin('');
			} else if (newVal < rangeMax) {
				setRangeMin(newVal);
				setInputMin(newValStr);
			}
		},
		[inputMin, rangeMax]
	);

	const handleInputMax = useCallback(
		(val: number) => {
			const newVal = val;
			const newValStr = String(val);

			const newValLen = newValStr.length;
			const rangeMinLen = String(rangeMin).length;
			const rangeMaxLen = String(rangeMax).length;

			if (newValStr === '0') {
				setInputMax('');
			} else if (
				rangeMinLen <= newValLen &&
				newVal > rangeMin &&
				priceMax >= newVal
			) {
				setRangeMax(newVal);
				setInputMax(newValStr);
			} else if (rangeMaxLen >= newValLen && priceMax > newVal) {
				setInputMax(newValStr);
			}
		},
		[inputMax, rangeMax, priceMax, rangeMin]
	);

	return (
		<div className={classNames(cls.PriceRangeSlider, {}, [className])}>
			<div className={cls.PriceRangeSlider__inner}>
				<div className={cls.PriceRangeSlider__track}>
					<div ref={rangeRef} className={cls.PriceRangeSlider__range} />
				</div>
				<Input
					theme={InputTheme.PRICE_RANGE}
					type={InputType.RANGE}
					min={priceMin}
					max={priceMax - 1}
					step={1}
					value={rangeMin}
					onChange={(val) => handleRangeMin(+val)}
					className={cls.PriceRangeSlider__thumb}
				/>
				<Input
					theme={InputTheme.PRICE_RANGE}
					type={InputType.RANGE}
					min={priceMin + 1}
					max={priceMax}
					step={1}
					value={rangeMax}
					onChange={(val) => handleRangeMax(+val)}
					className={cls.PriceRangeSlider__thumb}
				/>
			</div>
			<div className={cls.PriceRangeSlider__prices}>
				<Input
					theme={InputTheme.PRICE_INPUT}
					type={InputType.NUMBER}
					label={'Min'}
					labelId={'Min'}
					min={priceMin}
					max={priceMax - 1}
					step={1}
					value={inputMin}
					onChange={handleInputMin}
				/>
				<Input
					theme={InputTheme.PRICE_INPUT}
					type={InputType.NUMBER}
					label={'Max'}
					labelId={'Max'}
					min={priceMin + 1}
					max={priceMax}
					step={1}
					value={inputMax}
					onChange={handleInputMax}
				/>
			</div>
		</div>
	);
});
