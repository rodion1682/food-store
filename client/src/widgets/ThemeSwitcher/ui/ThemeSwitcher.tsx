import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon';
import ThemeIcon from 'shared/assets/icons/theme.svg';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { toggleTheme } = useTheme();
	return (
		<Button
			theme={ButtonTheme.THEME_SWITCHER}
			onClick={toggleTheme}
			className={classNames('', {}, [className])}
		>
			<SvgIcon children={<ThemeIcon />} />
		</Button>
	);
});
