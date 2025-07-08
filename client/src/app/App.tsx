import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserInited, userActions } from 'entities/User';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const inited = useAppSelector(getUserInited);

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	document.body.className = theme;
	return (
		<div className={classNames('app', {}, [])}>
			<Suspense fallback="">
				<Navbar />
				{inited && <AppRouter />}
			</Suspense>
		</div>
	);
};

export default App;
