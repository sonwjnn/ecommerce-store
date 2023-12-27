import privateClient from '../client/private.client'

const productEndpoints = {
  list: 'products/list',
  detail: ({ productId }) => `products/detail/${productId}`,
  search: ({ productType, query, page }) =>
    `${productType}/search?query=${query}&page=${page}}`,
  productsOfCateBySlug: ({ cateSlug }) => `products/list/slug/${cateSlug}`,
  getImage: ({ imageName }) => `products/image/${imageName}`,
  productsByShopId: ({ shopId }) => `products/list/shop/${shopId}`,
}

const productApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(productEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getDetail: async ({ productId }) => {
    try {
      const response = await privateClient.get(
        productEndpoints.detail({ productId })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
  search: async ({ query, page }) => {
    try {
      const response = await privateClient.get(
        productEndpoints.search({
          query,
          page,
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getProductsOfCateBySlug: async ({ cateSlug }) => {
    try {
      const response = await privateClient.get(
        productEndpoints.productsOfCateBySlug({ cateSlug })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getProductsByShopId: async ({ shopId }) => {
    try {
      const response = await privateClient.get(
        productEndpoints.productsByShopId({ shopId })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getImage: async ({ imageName }) => {
    try {
      const response = await privateClient.get(
        productEndpoints.getImage({ imageName })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default productApi
