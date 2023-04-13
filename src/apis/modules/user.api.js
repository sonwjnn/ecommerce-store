import privateClient from '../client/private.client.js'
import publicClient from '../client/public.client.js'

const userEndpoints = {
  signin: 'permisson/processLogin',
  signout: 'permisson/logout',
  signup: 'user/signup',
  getInfo: 'permisson/getMaintainUser',
  addUser: 'permisson/add',
  update: 'permisson/user/update',
  passwordUpdate: 'permisson/user/updatePassword'
}

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password
      })

      return { response }
    } catch (error) {
      return { error }
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName
      })
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo)
      return { response }
    } catch (error) {
      return { error }
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword
      })
      return { response }
    } catch (error) {
      return { error }
    }
  }
}

export default userApi
