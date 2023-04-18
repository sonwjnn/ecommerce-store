import privateClient from '../client/private.client'

const productEndpoints = {
  list: 'products/list',
  detail: ({ productId }) => `products/detail/${productId}`,
  add: 'user/products',
  remove: ({ productId }) => `user/products/${productId}`
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
  }
}

export default productApi
