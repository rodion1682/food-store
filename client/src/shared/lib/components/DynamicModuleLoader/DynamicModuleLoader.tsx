import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
};

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
	children: ReactNode;
	reducers: ReducersList;
	remvoeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
	const { children, reducers, remvoeAfterUnmount } = props;
	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useAppDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
			store.reducerManager.add(name, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});

		return () => {
			if (remvoeAfterUnmount) {
				Object.entries(reducers).forEach(
					([name, reducer]: ReducerListEntry) => {
						store.reducerManager.remove(name);
						dispatch({ type: `@DESTROY ${name} reducer` });
					}
				);
			}
		};
	}, []);

	return children;
};
