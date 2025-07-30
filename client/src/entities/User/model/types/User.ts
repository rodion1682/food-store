export interface User {
	id: number;
	email: string;
	username: string;
	avatar: string;
}

export interface UserSchema {
	authData?: User;
	_inited: boolean;
}
