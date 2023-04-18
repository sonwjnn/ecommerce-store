import privateClient from '../client/private.client'

const productEndpoints = {
  list: 'products/list',
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
  }
}

export default productApi
