import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProductsPage } from 'pages/ProductsPage';
import { RouteProps } from 'react-router-dom';

export enum Approutes {
	MAIN = 'main',
	PRODUCTS = 'products',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<Approutes, string> = {
	[Approutes.MAIN]: '/',
	[Approutes.PRODUCTS]: '/products',
	[Approutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<Approutes, RouteProps> = {
	[Approutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[Approutes.PRODUCTS]: {
		path: RoutePath.products,
		element: <ProductsPage />,
	},
	[Approutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
