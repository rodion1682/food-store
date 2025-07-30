import { User } from 'entities/User';

export interface Review {
	id: number;
	user: User;
	rating: number;
	text: string;
	created_at: string;
}
