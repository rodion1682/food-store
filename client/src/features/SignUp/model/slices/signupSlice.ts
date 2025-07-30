import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignupSchema } from '../types/signupSchema';
import { signup } from '../services/signup';

const initialState: SignupSchema = {
	isLoading: false,
	firstname: '',
	lastname: '',
	username: '',
	email: '',
	password: '',
	error: '',
	avatar: null,
};

export const signupSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		setFirstname: (state, action: PayloadAction<string>) => {
			state.firstname = action.payload;
		},
		setLastname: (state, action: PayloadAction<string>) => {
			state.lastname = action.payload;
		},
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setAvatar: (state, action: PayloadAction<File>) => {
			state.avatar = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(signup.rejected, (state, action) => {
				state.isLoading = false;
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				}
			});
	},
});

export const { actions: signupActions } = signupSlice;
export const { reducer: signupReducer } = signupSlice;
