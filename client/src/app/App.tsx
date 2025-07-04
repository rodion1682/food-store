import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from 'entities/User';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	document.body.className = theme;
	return (
		<div className={classNames('app', {}, [])}>
			<Suspense fallback="">
				<Navbar />
				<AppRouter />
			</Suspense>
		</div>
	);
};

export default App;
