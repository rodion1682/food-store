import { createContext } from 'react';

export enum Theme {
	LIGHT = 'app_light_theme',
	DARK = 'app_dark_theme',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export interface ThemeContextProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
	theme: Theme.LIGHT,
	setTheme: () => {
		throw new Error('setTheme not initialized');
	},
});
