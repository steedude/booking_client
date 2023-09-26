import request from '@/utils/request';

export function fetchProductsApi() {
  return request.get('/products');
}
