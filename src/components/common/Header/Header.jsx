import { cn } from '@/utils/helpers'
import { useLocation, useParams } from 'react-router-dom'

import HeaderContent from './HeaderContent'
import HeaderNav from './HeaderNav'

const Header = () => {
  const location = useLocation()
  const { sign, productId, accountType, keyword, authCate } = useParams()

  return (
    <>
      <div
        className={cn(
          `inset-x-0 z-[51] h-[150px] w-full  md:h-[120px] 
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
        <div className="bg-white shadow-sm">
          <HeaderNav />
          <HeaderContent />
        </div>
      </div>
    </>
  )
}

export default Header
