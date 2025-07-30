import { Product } from './product';

export interface ProductDetailSchema {
	data?: Product;
	isLoading: boolean;
	error?: string;
}
