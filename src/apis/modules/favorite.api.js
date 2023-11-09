import privateClient from '../client/private.client'

const favoriteEndpoints = {
  list: 'user/favorites',
  add: 'user/favorites',
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
  removefavorites: 'user/favorites',
}

const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  },

  add: async ({ productId }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, {
        productId,
      })
      return { response }
    } catch (error) {
      return { error }
    }
  },

  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({
          favoriteId,
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
  removeFavorites: async ({ favoriteIds }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.removeFavorites,
        {
          data: favoriteIds,
        }
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default favoriteApi
