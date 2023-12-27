import privateClient from '../client/private.client'

const categoryEndpoints = {
  list: 'categories/list',
}

const categoryApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(categoryEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default categoryApi
