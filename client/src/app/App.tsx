import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Suspense } from 'react';
const App = () => {
	const { theme } = useTheme();

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
