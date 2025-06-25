import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { SvgIcon } from 'shared/ui/SvgIcon/ui/SvgIcon';
import LanguageIcon from 'shared/assets/icons/language.svg';
import { memo } from 'react';

interface LangSwitcherProps {
	className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation();
	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
	};

	return (
		<Button
			className={classNames('', {}, [className])}
			onClick={toggleLanguage}
			theme={ButtonTheme.LANG_SWITCHER}
		>
			<SvgIcon children={<LanguageIcon />} />
			<span>{t('Language')}</span>
		</Button>
	);
});
