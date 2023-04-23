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
  add: async ({
    productId,
    productTitle,
    productPrice,
    cateName,
    productImage,
    quantity
  }) => {
    try {
      const response = await privateClient.post(cartEndpoints.add, {
        productId,
        cateName,
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
  remove: async ({ productId }) => {
    try {
      const response = await privateClient.delete(
        cartEndpoints.remove({
          productId
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default cartApi
