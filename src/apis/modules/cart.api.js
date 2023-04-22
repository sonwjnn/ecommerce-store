import privateClient from '../client/private.client'

const cartEndpoints = {
  list: 'user/carts',
  add: 'user/carts',
  remove: ({ cartId }) => `carts/${cartId}`
}

const cartApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(cartEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  add: async ({ productId, productTitle, productPrice, productType }) => {
    try {
      const response = await privateClient.post(cartEndpoints.add, {
        productId,
        productType,
        productTitle,
        productPrice
      })
      return { response }
    } catch (error) {
      return { error }
    }
  },
  remove: async ({ cartId }) => {
    try {
      const response = await privateClient.delete(
        cartEndpoints.remove({
          cartId
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default cartApi
