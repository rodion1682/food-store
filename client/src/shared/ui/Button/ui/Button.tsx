import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { SvgIcon, SvgIconThemes } from 'shared/ui/SvgIcon';
import ChevroneIcon from 'shared/assets/icons/chevrone.svg';

export enum ButtonTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	GREEN = 'green',
	RED = 'red',
	THEME_SWITCHER = 'theme_switcher',
	LANG_SWITCHER = 'lang_switcher',
	FILTERBAR_SWITCHER = 'filterbar_switcher',
	PASSWORD = 'password',
	SUBMIT = 'submit',
	DROPDOWN = 'dropdown',
	SELECT = 'select',
	ACTION_BORDER = 'action_border',
	ACTION = 'action',
	CLEAN = 'clean',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	theme?: ButtonTheme;
	disabled?: boolean;
	open?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		theme = ButtonTheme.PRIMARY,
		disabled,
		open,
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.disabled]: disabled,
		[cls.dropdown_open]: open,
	};

	return (
		<button
			className={classNames(cls.Button, mods, [className, cls[theme]])}
			type="button"
			disabled={disabled}
			{...otherProps}
		>
			{children}
			{theme === ButtonTheme.DROPDOWN && (
				<SvgIcon
					className={cls.dropdown__icon}
					theme={SvgIconThemes.SMALL}
					children={<ChevroneIcon />}
				/>
			)}
		</button>
	);
});
