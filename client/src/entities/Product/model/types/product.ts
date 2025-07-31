export enum ProdcutCategoriesType {
	'FRUITS' = 'FRUITS',
	'VEGETABLES' = 'VEGETABLES',
	'BREADS' = 'BREADS',
}

export interface Product {
	id?: number;
	title?: string;
	subtitle?: string;
	image_1?: string;
	created_by?: number;
	views?: number;
	product_categories?: ProdcutCategoriesType[];
	sale?: boolean;
	price?: number;
	sale_price?: number;
	product_rating_average?: number;
	product_rating_total?: number;
}
