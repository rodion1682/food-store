import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	return (
		<nav className={classNames(cls.Navbar, {}, [className])}>
			<div className={cls.Navbar__links}>
				<AppLink to={RoutePath.main}>{t('Main Page')}</AppLink>
				<AppLink to={RoutePath.products}>{t('Products Page')}</AppLink>
			</div>
			<ThemeSwitcher />
			<LangSwitcher />
		</nav>
	);
});
