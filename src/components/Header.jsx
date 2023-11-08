import { cn } from '@/lib/utils'
import { useLocation, useParams } from 'react-router-dom'

import HeaderNavigate from './HeaderNavigate'
import SearchMain from './SearchMain'

const Header = () => {
  const location = useLocation()
  const { sign, productId, accountType, keyword, authCate } = useParams()
  const carts = location.pathname === '/user/carts'

  return (
    <>
      <div
        className={cn(
          `header w-full bg-primary 
        `,
          !sign && !productId ? 'fixed' : '',
          productId ||
            accountType ||
            authCate ||
            keyword ||
            location.pathname.includes('account')
            ? 'relative'
            : '',
          sign ? 'hidden' : ''
        )}
      >
        <div className="wide grid">
          <HeaderNavigate />
          <SearchMain />
        </div>
      </div>
    </>
  )
}

export default Header
