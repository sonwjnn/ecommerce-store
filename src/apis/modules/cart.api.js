import privateClient from '../client/private.client'

const cartEndpoints = {
  list: 'user/carts',
  add: 'user/carts',
  remove: ({ cartId }) => `user/carts/${cartId}`,
  removeCarts: `user/carts`
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

  add: async ({
    productId,
    productTitle,
    productPrice,
    productType,
    productImage,
    quantity
  }) => {
    try {
      const response = await privateClient.post(cartEndpoints.add, {
        productId,
        productType,
        productTitle,
        productPrice,
        productImage,
        quantity
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
  },
  removeCarts: async ({ cartIds }) => {
    try {
      const response = await privateClient.delete(cartEndpoints.removeCarts, {
        data: cartIds
      })
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default cartApi
