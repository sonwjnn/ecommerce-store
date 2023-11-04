import privateClient from '../client/private.client'

const shopEndpoints = {
  list: 'shops',
  add: 'shops',
  info: 'shops/info',
  update: 'shops'
}

const shopApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(shopEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  },

  add: async ({ title, address, city, district }) => {
    try {
      const response = await privateClient.post(shopEndpoints.add, {
        title,
        address,
        city,
        district
      })
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(shopEndpoints.info)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  update: async ({ title, address, district, city }) => {
    try {
      const response = await privateClient.put(shopEndpoints.update, {
        title,
        address,
        city,
        district
      })
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default shopApi
