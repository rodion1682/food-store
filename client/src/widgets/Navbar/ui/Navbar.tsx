import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme, ProfileLink } from 'shared/ui/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const authData = useAppSelector(getUserAuthData);

	const dispatch = useAppDispatch();

	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

	const handleOpenModal = useCallback(() => {
		setIsAuthModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsAuthModalOpen(false);
	}, []);

	const handleLogout = useCallback(() => {
		dispatch(userActions.logout());
		if (pathname !== RoutePath.main) {
			navigate(RoutePath.main);
		}
	}, [dispatch, pathname, navigate]);

	const isActive = useCallback(
		(linkPath: string) => {
			const end = linkPath === RoutePath.main;
			return !!matchPath({ path: linkPath, end }, pathname);
		},
		[pathname]
	);

	return (
		<nav className={classNames(cls.Navbar, {}, [className])}>
			<div className={classNames(cls.Navbar__container, {}, ['_container'])}>
				<div className={cls.Navbar__links}>
					<AppLink
						to={RoutePath.main}
						theme={AppLinkTheme.NAVBAR}
						active={isActive(RoutePath.main)}
					>
						{t('Main Page')}
					</AppLink>
					<AppLink
						to={RoutePath.products}
						theme={AppLinkTheme.NAVBAR}
						active={isActive(RoutePath.products)}
					>
						{t('Products Page')}
					</AppLink>
					{authData && (
						<ProfileLink
							id={authData.id}
							src={authData.avatar}
							username={authData.username}
							active={isActive(RoutePath.profile)}
							theme={AppLinkTheme.NAVBAR}
							width={35}
							height={35}
						/>
					)}
				</div>
				<div className={cls.Navbar__actions}>
					<ThemeSwitcher className={cls.Navbar__action} />
					<LangSwitcher className={cls.Navbar__action} />
					{authData ? (
						<Button className={cls.Navbar__action} onClick={handleLogout}>
							{t('Logout')}
						</Button>
					) : (
						<>
							<Button
								className={cls.Navbar__action}
								onClick={handleOpenModal}
							>
								{t('Login')}
							</Button>
							{isAuthModalOpen && (
								<LoginModal
									isOpen={isAuthModalOpen}
									onClose={handleCloseModal}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</nav>
	);
});
