import { toast } from 'react-hot-toast'
import { FaUserAlt } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import { HiBell } from 'react-icons/hi'
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
    <div className=" z-10 flex h-full items-center justify-around bg-white p-4 text-4xl text-primary shadow-md shadow-gray-600">
      <Link to={'/'}>
        <GoHomeFill />
      </Link>
      <Link>
        <HiBell />
      </Link>
      <button onClick={handleAccountPage}>
        <FaUserAlt />
      </button>
    </div>
  )
}

export default NavigateMobile
