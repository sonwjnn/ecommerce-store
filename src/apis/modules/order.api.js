import privateClient from '../client/private.client'

const orderEndpoints = {
  list: 'user/orders',
  add: 'user/orders',
  remove: ({ orderId }) => `user/orders/${orderId}`,
  removeOrders: `user/orders`,
  updateOrder: `user/orders`,
}

const orderApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(orderEndpoints.list)
      return { response }
    } catch (error) {
      return { error }
    }
  },

  add: async ({ products }) => {
    try {
      const response = await privateClient.post(orderEndpoints.add, {
        products,
      })
      return { response }
    } catch (error) {
      return { error }
    }
  },

  remove: async ({ orderId }) => {
    try {
      const response = await privateClient.delete(
        orderEndpoints.remove({
          orderId,
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default orderApi
