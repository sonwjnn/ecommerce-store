import { toast } from 'react-hot-toast'
import { FaBell, FaUserAlt } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const NavigateMobile = () => {
  const { user } = useSelector(state => state.user)

  const navigate = useNavigate()

  const handleAccountPage = () => {
    if (!user) {
      navigate('/auth/signin')
      toast.warning('You must login first!', { toastId: 'warning-login' })
      return
    }

    navigate('/user/account/index')
  }

  return (
    <div className=" flex h-full items-center justify-around bg-white p-4 text-3xl text-primary shadow-md shadow-gray-600">
      <Link to={'/'}>
        <HiHome />
      </Link>
      <Link>
        <FaBell />
      </Link>
      <button onClick={handleAccountPage}>
        <FaUserAlt />
      </button>
    </div>
  )
}

export default NavigateMobile
