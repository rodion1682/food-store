import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
	routeConfig,
	AppRoutesProps,
} from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = (
			<Suspense fallback={<PageLoader />}>{route.element}</Suspense>
		);
		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
				}
			/>
		);
	}, []);

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
