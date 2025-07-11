import { memo, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from '../config/StateSchema';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema;
	asyncReducers?: ReducersMapObject<StateSchema>;
}

export const StoreProvider = memo((props: StoreProviderProps) => {
	const { children, initialState, asyncReducers } = props;
	const navigate = useNavigate();

	const store = createReduxStore(initialState, asyncReducers, navigate);

	return <Provider store={store}>{children}</Provider>;
});
