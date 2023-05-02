import privateClient from '../client/private.client'

const reviewEndpoints = {
  list: 'reviews',
  add: 'reviews',
  remove: ({ reviewId }) => `reviews/${reviewId}`
}

const reviewApi = {
  add: async ({
    productId,
    productType,
    productTitle,
    productImage,
    content
  }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        productId,
        productType,
        productTitle,
        productImage,
        content
      })

      return { response }
    } catch (error) {
      return { error }
    }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({
          reviewId
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list)

      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default reviewApi
