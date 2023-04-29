import privateClient from '../client/private.client'

const productEndpoints = {
  list: 'products/list',
  detail: ({ productId }) => `products/detail/${productId}`,
  search: ({ productType, query, page }) =>
    `${productType}/search?query=${query}&page=${page}}`
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
          page
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default productApi
