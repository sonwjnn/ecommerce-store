import privateClient from '../client/private.client'

const orderEndpoints = {
  list: 'user/orders',
  add: 'user/orders',
  detail: ({ orderId }) => `user/order/${orderId}`,
  remove: ({ orderId }) => `user/orders/${orderId}`,
  removeOrders: `user/orders`,
  updateOrder: ({ itemId }) => `user/orders/item/${itemId}`,
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
  getDetail: async ({ orderId }) => {
    try {
      const response = await privateClient.get(
        orderEndpoints.detail({
          orderId,
        })
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },

  updateOrder: async ({ itemId, status }) => {
    try {
      const response = await privateClient.put(
        orderEndpoints.updateOrder({
          itemId,
        }),
        {
          status,
        }
      )
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default orderApi
