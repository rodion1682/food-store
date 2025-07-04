import { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	NAVBAR = 'navbar',
}

interface AppLinkProps extends LinkProps {
	className?: string;
	children: ReactNode;
	theme?: AppLinkTheme;
	active?: boolean;
}

export const AppLink = memo((props: AppLinkProps) => {
	const {
		className,
		to,
		children,
		theme = AppLinkTheme.PRIMARY,
		active,
		...otherProps
	} = props;

	return (
		<Link
			to={to}
			className={classNames(cls.AppLink, { [cls.active]: active }, [
				className,
				cls[theme],
			])}
			{...otherProps}
		>
			{children}
		</Link>
	);
});
