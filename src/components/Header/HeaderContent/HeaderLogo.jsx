import { Link } from 'react-router-dom'

const HeaderLogo = () => {
  return (
    <div className="header__logo h-full ">
      <Link to="/" className="block h-full w-full">
        <div
          className="!md:mt-0 !mt-1 h-[50px] w-[150px] bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              new URL(
                `../../../assets/img/logos/logo_header_2.svg`,
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
