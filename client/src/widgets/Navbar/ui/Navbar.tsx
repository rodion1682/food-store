import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import { useSelector } from 'react-redux';
import { getCounterValue } from 'entities/Counter/model/selectors/getCounterValue/getCounterValue';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const counterValue = useSelector(getCounterValue);

	const toggleModal = useCallback(() => {
		setIsAuthModal((prev) => !prev);
	}, []);

	return (
		<nav className={classNames(cls.Navbar, {}, [className])}>
			<div className={cls.Navbar__links}>
				<AppLink to={RoutePath.main}>{t('Main Page')}</AppLink>
				<AppLink to={RoutePath.products}>{t('Products Page')}</AppLink>
			</div>
			<ThemeSwitcher />
			<LangSwitcher />
			<Button onClick={toggleModal}>Modal button</Button>
			<Modal isOpen={isAuthModal} onClose={toggleModal}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
				id ipsa totam cupiditate omnis dolores optio repellendus assumenda
				debitis laudantium dignissimos ad repellat neque voluptatem
				incidunt, numquam quas tempora architecto?
			</Modal>
			<div>counterValue: {counterValue}</div>
		</nav>
	);
});
