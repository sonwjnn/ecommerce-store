import privateClient from '../client/private.client'

const productEndpoints = {
  list: 'user/products',
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
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(productEndpoints.add, {
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
  remove: async ({ productId }) => {
    try {
      const response = await privateClient.delete(
        productEndpoints.remove({
          productId
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default productApi
