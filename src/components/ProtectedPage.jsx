import { setAuthModalOpen } from '@/redux/features/authModelSlice'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// use like middle steps for component of user
const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!user) {
      toast.error('You must login first!')
      navigate('/auth')
    }
  }, [user, dispatch])

  return user ? children : null
}

export default ProtectedPage
