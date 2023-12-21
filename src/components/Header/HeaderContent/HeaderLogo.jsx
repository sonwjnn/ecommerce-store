import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const HeaderLogo = ({ className }) => {
  return (
    <div className={cn(' flex h-full w-[200px] p-2', className)}>
      <Link to="/" className="block h-full w-full">
        <div
          className=" mx-auto h-[50px] w-[150px] bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              new URL(
                `../../../assets/images/logos/logo_header_2.svg`,
                import.meta.url
              ).href
            })`,
          }}
        ></div>
      </Link>
    </div>
  )
}

export default HeaderLogo
