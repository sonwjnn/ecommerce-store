import { cn } from '@/lib/utils'
import { useLocation, useParams } from 'react-router-dom'

import HeaderContent from './HeaderContent/HeaderContent'
import HeaderNav from './HeaderNav/HeaderNav'

const Header = () => {
  const location = useLocation()
  const { sign, productId, accountType, keyword, authCate } = useParams()

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
          <HeaderNav />
          <HeaderContent />
        </div>
      </div>
    </>
  )
}

export default Header
