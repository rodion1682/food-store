import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Counter.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button';

interface CounterProps {
	className?: string;
	value?: number;
	onIncrease?: () => void;
	onDecrease?: () => void;
}

export const Counter = memo((props: CounterProps) => {
	const { className, value, onIncrease, onDecrease } = props;

	return (
		<div className={classNames(cls.Counter, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAN}
				onClick={onDecrease}
				disabled={value === 1}
			>
				-
			</Button>
			<div className={cls.Counter__value}>{value}</div>
			<Button theme={ButtonTheme.CLEAN} onClick={onIncrease}>
				+
			</Button>
		</div>
	);
});
