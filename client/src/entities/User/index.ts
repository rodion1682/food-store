export { userReducer, userActions } from './model/slice/userSlice';

export type { User, UserSchema } from './model/types/User';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
