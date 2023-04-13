import privateClient from '../client/private.client'

const cartEndpoints = {
  list: 'permisson/carts',
  add: 'permisson/carts',
  remove: ({ cartId }) => `permisson/carts/${cartId}`
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
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(cartEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate
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
