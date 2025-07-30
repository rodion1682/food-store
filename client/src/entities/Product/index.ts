export { ProductDetails } from './ui/ProductDetails/ProductDetails';

export type { Product } from './model/types/product';
export type { ProductDetailSchema } from './model/types/productDetailSchema';

export { getProductData } from './model/selectors/getProductData/getProductData';
export { getProductIsLoading } from './model/selectors/getProductIsLoading/getProductIsLoading';
export { getProductError } from './model/selectors/getProductError/getProductError';

export { fetchProductById } from './model/services/fetchProductById/fetchProductById';
