import {
	Dispatch,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
	UnknownAction,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterScheme } from 'entities/Counter';
import { ProductDetailSchema } from 'entities/Product';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { AddNewReviewSchema } from 'features/addNewReview';
import { LoginSchema } from 'features/AuthByUsername';
import { SignupSchema } from 'features/SignUp';
import { ProductDetailsReviewScheme } from 'pages/ProductDetailsPage';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
	counter: CounterScheme;
	user: UserSchema;

	// Async reducers
	loginForm?: LoginSchema;
	signupForm?: SignupSchema;
	profile?: ProfileSchema;
	productDetails?: ProductDetailSchema;
	productDetailsReviews?: ProductDetailsReviewScheme;
	addNewReview?: AddNewReviewSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}
