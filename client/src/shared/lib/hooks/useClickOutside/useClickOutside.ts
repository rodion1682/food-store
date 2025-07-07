import { useCallback, useEffect } from 'react';

interface clickOutsideProps {
	target?: HTMLElement;
	button?: HTMLElement;
	duration?: number;
	isOpen?: boolean;
	onClose?: () => void;
}
export const useClickOutside = (props: clickOutsideProps) => {
	const { target, button, duration = 500, isOpen, onClose } = props;

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (isOpen && target && !target.contains(e.target as Node)) {
				if (onClose) {
					button?.setAttribute('disabled', 'true');
					onClose();
				}
				setTimeout(() => {
					button?.removeAttribute('disabled');
				}, duration);
			}
		},
		[isOpen, onClose, target, duration, button]
	);

	useEffect(() => {
		if (isOpen) {
			button?.setAttribute('disabled', 'true');
			setTimeout(() => {
				window.addEventListener('click', handleClickOutside);
				button?.removeAttribute('disabled');
			}, duration);
		}

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, [isOpen, handleClickOutside, duration, button]);
};
