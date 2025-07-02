import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	THEME_SWITCHER = 'theme_switcher',
	LANG_SWITCHER = 'lang_switcher',
	FILTERBAR_SWITCHER = 'filterbar_switcher',
	PASSWORD = 'password',
	SUBMIT = 'submit',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	theme?: ButtonTheme;
	disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		theme = ButtonTheme.PRIMARY,
		disabled,
		...otherProps
	} = props;

	return (
		<button
			className={classNames(cls.Button, { [cls.disabled]: disabled }, [
				className,
				cls[theme],
			])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
