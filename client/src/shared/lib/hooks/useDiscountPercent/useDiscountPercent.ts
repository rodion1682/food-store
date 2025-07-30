import { useMemo } from 'react';

export const useDiscountPercent = (
	price?: number,
	salePrice?: number
): number => {
	return useMemo(() => {
		if (!price || !salePrice || price <= 0 || salePrice >= price) {
			return 0;
		}
		const discount = ((price - salePrice) / price) * 100;
		return Math.round(discount);
	}, [price, salePrice]);
};
