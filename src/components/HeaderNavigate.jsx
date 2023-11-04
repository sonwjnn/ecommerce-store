import React from 'react'

import HeaderMenu from './HeaderMenu'
import HeaderSocial from './HeaderSocial'

const HeaderNavigate = () => {
  return (
    <nav className="header__nav hide-on-mobile-tablet">
      <HeaderSocial />
      <HeaderMenu />
    </nav>
  )
}

export default HeaderNavigate
