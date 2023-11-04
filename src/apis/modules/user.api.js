import privateClient from '../client/private.client'
import publicClient from '../client/public.client.js'

const userEndpoints = {
  profileUpdate: 'user/update-profile',
  signin: 'user/signin',
  signup: 'user/signup',
  passwordUpdate: 'user/update-password',
  getInfo: 'user/info',
}

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
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
        displayName,
        role: 'user',
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
        confirmNewPassword,
      })
      return { response }
    } catch (error) {
      return { error }
    }
  },
  profileUpdate: async ({
    displayName,
    email,
    phone,
    address,
    city,
    district,
    sex,
    birthday,
  }) => {
    try {
      const response = await privateClient.put(userEndpoints.profileUpdate, {
        displayName,
        email,
        phone,
        address,
        city,
        district,
        sex,
        birthday,
      })
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default userApi
