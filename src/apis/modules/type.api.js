import privateClient from '../client/private.client'

const typeEndpoints = {
  list: 'product-types/list',
  typesOfCate: ({ cateName }) => `product-types/list/${cateName}`,
}

const typeApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(typeEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getTypesOfCate: async ({ cateName }) => {
    try {
      const response = await privateClient.get(
        typeEndpoints.typesOfCate({ cateName })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default typeApi
