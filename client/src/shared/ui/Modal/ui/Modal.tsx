import { ReactNode, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { Portal } from 'shared/ui/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

interface ModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	children?: ReactNode;
	lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
	const { className, isOpen, onClose, children, lazy } = props;
	const [isMounted, setIsMounted] = useState(false);
	const { theme } = useTheme();

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const closeHandler = useCallback(() => {
		if (onClose) {
			onClose();
		}
	}, [onClose]);

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler();
			}
		},
		[closeHandler]
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div
				className={classNames(cls.Modal, { [cls.Modal__open]: isOpen }, [
					className,
					theme,
				])}
				onClick={closeHandler}
			>
				<div className={cls.Modal__content} onClick={onContentClick}>
					{children}
				</div>
			</div>
		</Portal>
	);
};
