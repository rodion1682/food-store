import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SvgIcon.module.scss';
import { memo, ReactNode } from 'react';

export enum SvgIconThemes {
	NAVBAR_THEME = 'navbar_theme',
	SMALL = 'small',
}

interface SvgIconProps {
	className?: string;
	children?: ReactNode;
	theme?: SvgIconThemes;
	stroke?: boolean;
}

export const SvgIcon = memo((props: SvgIconProps) => {
	const {
		className,
		children,
		theme = SvgIconThemes.NAVBAR_THEME,
		stroke,
	} = props;
	return (
		<div
			className={classNames(cls.SvgIcon, { [cls.SvgIcon__stroke]: stroke }, [
				className,
				cls[theme],
			])}
		>
			{children}
		</div>
	);
});
