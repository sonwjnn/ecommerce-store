import privateClient from '../client/private.client'

const productEndpoints = {
  list: 'products/list',
  detail: ({ productId }) => `products/detail/${productId}`,
  search: ({ productType, query, page }) =>
    `${productType}/search?query=${query}&page=${page}}`,
  productsOfCate: ({ cateName }) => `products/list/${cateName}`,
  getImage: ({ imageName }) => `products/image/${imageName}`,
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
  getProductsOfCate: async ({ cateName }) => {
    try {
      const response = await privateClient.get(
        productEndpoints.productsOfCate({ cateName })
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
