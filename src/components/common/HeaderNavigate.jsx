import React from 'react'
import HeaderSocial from './HeaderSocial'
import HeaderMenu from './HeaderMenu'

const HeaderNavigate = () => {
  return (
    <nav className="header__nav hide-on-mobile-tablet">
      <HeaderSocial />
      <HeaderMenu />
    </nav>
  )
}

export default HeaderNavigate
