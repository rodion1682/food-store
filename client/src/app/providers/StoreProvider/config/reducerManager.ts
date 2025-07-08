import {
	combineReducers,
	Reducer,
	ReducersMapObject,
	UnknownAction,
} from '@reduxjs/toolkit';
import { StateSchema, StateSchemaKey } from './StateSchema';

export function createReducerManager(initial: ReducersMapObject<StateSchema>) {
	let reducers: ReducersMapObject<StateSchema> = { ...initial };

	const buildRoot = () =>
		combineReducers(
			reducers as ReducersMapObject<StateSchema>
		) as Reducer<StateSchema>;

	let combinedReducer = buildRoot();
	let keysToRemove: StateSchemaKey[] = [];

	return {
		getReducerMap: () => reducers,

		reduce(
			state: StateSchema | undefined,
			action: UnknownAction
		): StateSchema {
			if (state && keysToRemove.length) {
				state = { ...state };
				for (const key of keysToRemove) delete state[key];
				keysToRemove = [];
			}
			return combinedReducer(state, action);
		},
		add(key: StateSchemaKey, reducer: Reducer) {
			if (!key || reducers[key]) return;
			reducers = { ...reducers, [key]: reducer };
			combinedReducer = buildRoot();
		},
		remove(key: StateSchemaKey) {
			if (!key || !reducers[key]) return;
			delete reducers[key];
			keysToRemove.push(key);
			combinedReducer = buildRoot();
		},
	};
}
