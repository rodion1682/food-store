export interface User {
	id: number;
	email: string;
}

export interface UserSchema {
	authData?: User;
}
