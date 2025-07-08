import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProductsPage } from 'pages/ProductsPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
};

export enum Approutes {
	MAIN = 'main',
	PRODUCTS = 'products',
	PROFILE = 'profile',
	// last route
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<Approutes, string> = {
	[Approutes.MAIN]: '/',
	[Approutes.PRODUCTS]: '/products',
	[Approutes.PROFILE]: '/profile',
	[Approutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<Approutes, AppRoutesProps> = {
	[Approutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[Approutes.PRODUCTS]: {
		path: RoutePath.products,
		element: <ProductsPage />,
	},
	[Approutes.PROFILE]: {
		path: RoutePath.profile,
		element: <ProfilePage />,
		authOnly: true,
	},
	[Approutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
