import ReactDOM from 'react-dom/client';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';

import './shared/config/i18n/i18n';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
	<BrowserRouter>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</BrowserRouter>
);
