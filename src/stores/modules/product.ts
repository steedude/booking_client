import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchProductsApi } from '@/apis/product';
import type { Product } from '@/types/product';

export default defineStore(
  'booking-client-product',
  () => {
    const products = ref<Product[]>([]);
    const productMap = ref<Record<string, Product>>({});

    async function fetchProducts() {
      const { data } = await fetchProductsApi();

      products.value = data.products;
      productMap.value = products.value.reduce(
        (map, product) => {
          const { _id: id } = product;

          return { ...map, [id]: product };
        },
        {} as Record<string, Product>,
      );
    }

    return {
      products,
      productMap,
      fetchProducts,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ['products', 'productMap'],
    },
  },
);
