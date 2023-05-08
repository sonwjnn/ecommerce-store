import { HiHome } from 'react-icons/hi'
import { FaUserAlt, FaBell } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const NavigateMobile = () => {
  const { user } = useSelector(state => state.user)

  const navigate = useNavigate()

  const handleAccountPage = () => {
    if (!user) {
      navigate('/authUser/signin')
      toast.warning('You must login first!', { toastId: 'warning-login' })
      return
    }

    navigate('/user/account/profile')
  }

  return (
    <div className=" flex p-4 justify-around h-full items-center text-primary text-[30px] bg-white shadow-gray-600 shadow-md">
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
