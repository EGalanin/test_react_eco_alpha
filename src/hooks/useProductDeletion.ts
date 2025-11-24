import { useAppDispatch } from '@/store/hooks';
import { api } from '@/services/api';
import { useDeleteProductMutation } from '@/services/api';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import toast from 'react-hot-toast';
import { Product } from '@/types/product';

export const useProductDeletion = (currentPage: number, products: Product[]) => {
    const dispatch = useAppDispatch();
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id: number) => {
        const previousData = [...products];

        const queryParams = {
            page: currentPage + 1,
            limit: ITEMS_PER_PAGE,
            favoritesOnly: false,
        };

        dispatch(
            api.util.updateQueryData('getProducts', queryParams, (draft) =>
                draft.filter((product) => product.id !== id)
            )
        );

        try {
            await deleteProduct(id).unwrap();
            toast.success('Продукт успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении:', error);

            dispatch(api.util.updateQueryData('getProducts', queryParams, () => previousData));
            toast.error('Не удалось удалить продукт');
        }
    };

    return { handleDelete };
};
