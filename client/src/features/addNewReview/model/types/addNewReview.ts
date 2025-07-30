export interface AddNewReviewSchema {
	text?: string;
	rating?: number;
	product_id?: number;
	user_id?: number;
	created_at?: string;
	error?: string;
}
