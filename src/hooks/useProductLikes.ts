import { useAppDispatch } from '@/store/hooks';
import { api } from '@/services/api';
import { ITEMS_PER_PAGE } from '@/constants/pagination';

export const useProductLikes = (currentPage: number, showFavorites: boolean) => {
    const dispatch = useAppDispatch();

    const toggleLike = (id: number) => {
        const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
        const isLiked = likedProducts.includes(id);

        const newLikedProducts = isLiked
            ? likedProducts.filter((productId: number) => productId !== id)
            : [...likedProducts, id];

        localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts));

        dispatch(
            api.util.updateQueryData(
                'getProducts',
                {
                    page: currentPage + 1,
                    limit: ITEMS_PER_PAGE,
                    favoritesOnly: showFavorites,
                },
                (draft) => {
                    return draft.map((product) => ({
                        ...product,
                        isLiked: newLikedProducts.includes(product.id),
                    }));
                }
            )
        );

        dispatch(api.util.invalidateTags(['Products']));
    };

    return { toggleLike };
};
