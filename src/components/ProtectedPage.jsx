import { setAuthModalOpen } from '@/redux/features/authModelSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// use like middle steps for component of user
const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(setAuthModalOpen(!user))
  }, [user, dispatch])

  return user ? children : null
}

export default ProtectedPage
