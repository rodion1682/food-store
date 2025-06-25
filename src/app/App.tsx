import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';

const App = () => {
	const { theme } = useTheme();

	useEffect(() => {
		if (Math.random() < 0.5) {
			throw new Error();
		}
	}, []);

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback="">
				<Navbar />
				<AppRouter />
			</Suspense>
		</div>
	);
};

export default App;
