import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProductDetailsPage } from 'pages/ProductDetailsPage';
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
	PROFILE_DETAILS = 'profile_details',
	// last route
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<Approutes, string> = {
	[Approutes.MAIN]: '/',
	[Approutes.PRODUCTS]: '/products',
	[Approutes.PROFILE]: '/profile/', // + :id
	[Approutes.PROFILE_DETAILS]: '/products/', // + :id
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
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true,
	},
	[Approutes.PROFILE_DETAILS]: {
		path: `${RoutePath.profile_details}:id`,
		element: <ProductDetailsPage />,
	},
	[Approutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
