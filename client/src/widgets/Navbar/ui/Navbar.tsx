import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useAppSelector } from 'shared/hooks/useAppSelector/useAppSelector';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const authData = useAppSelector(getUserAuthData);
	const dispatch = useAppDispatch();

	const handleOpenModal = useCallback(() => {
		setIsAuthModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsAuthModalOpen(false);
	}, []);

	const handleLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	return (
		<nav className={classNames(cls.Navbar, {}, [className])}>
			<div className={cls.Navbar__links}>
				<AppLink to={RoutePath.main}>{t('Main Page')}</AppLink>
				<AppLink to={RoutePath.products}>{t('Products Page')}</AppLink>
			</div>
			<ThemeSwitcher />
			<LangSwitcher />
			{authData ? (
				<Button onClick={handleLogout}>{t('Logout')}</Button>
			) : (
				<>
					<Button onClick={handleOpenModal}>{t('Login')}</Button>
					{isAuthModalOpen && (
						<LoginModal
							isOpen={isAuthModalOpen}
							onClose={handleCloseModal}
						/>
					)}
				</>
			)}
		</nav>
	);
});
