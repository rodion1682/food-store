//import {
//	combineReducers,
//	Reducer,
//	ReducersMapObject,
//	UnknownAction,
//} from '@reduxjs/toolkit';
//import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

//export function createReducerManager(
//	initialReducers: ReducersMapObject<StateSchema>
//): ReducerManager {
//	const reducers = { ...initialReducers };
//	let combinedReducer = combineReducers(reducers);
//	let keysToRemove: Array<StateSchemaKey> = [];

//	return {
//		getReducerMap: () => reducers,
//		reduce: (state: StateSchema, action: UnknownAction) => {
//			if (keysToRemove.length > 0) {
//				state = { ...state };
//				for (let key of keysToRemove) {
//					delete state[key];
//				}
//				keysToRemove = [];
//			}
//			return combinedReducer(state, action);
//		},
//		add: (key: StateSchemaKey, reducer: Reducer) => {
//			if (!key || reducers[key]) {
//				return;
//			}
//			reducers[key] = reducer;
//			combinedReducer = combineReducers(reducers);
//		},
//		remove: (key: StateSchemaKey) => {
//			if (!key || !reducers[key]) {
//				return;
//			}
//			delete reducers[key];
//			keysToRemove.push(key);
//			combinedReducer = combineReducers(reducers);
//		},
//	};
//}
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
