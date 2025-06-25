import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Filterbar.module.scss';
import { Button } from 'shared/ui/Button';

interface FilterbarProps {
	className?: string;
}

export const Filterbar = memo(({ className }: FilterbarProps) => {
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
			<Button onClick={collapseHandler}>sidebar</Button>
		</div>
	);
});
