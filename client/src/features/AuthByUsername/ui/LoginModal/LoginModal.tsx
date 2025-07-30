import { memo, Suspense, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from 'shared/ui/Loader';
import { SignupForm } from 'features/SignUp';

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
	const { className, isOpen, onClose } = props;
	const [mode, setMode] = useState<'login' | 'signup'>('login');

	const toggleMode = useCallback(() => {
		setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
	}, []);
	return (
		<Modal
			className={classNames('', {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
			lazy
		>
			{mode === 'login' ? (
				<Suspense fallback={<Loader />}>
					<LoginFormAsync onSuccess={onClose} toggleMode={toggleMode} />
				</Suspense>
			) : (
				<Suspense fallback={<Loader />}>
					<SignupForm onSuccess={onClose} toggleMode={toggleMode} />
				</Suspense>
			)}
		</Modal>
	);
});
