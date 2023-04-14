import privateClient from '../client/private.client'
import publicClient from '../client/public.client'

const categoryEndpoints = {
  list: 'admin/categories/getAllCate'
}

const categoryApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(categoryEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default categoryApi
