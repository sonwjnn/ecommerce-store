import { cn } from '@/utils/helpers'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../ui/button'
import logo from '/images/logos/logo_header_2.svg'

export const Alert = props => {
  const { type = 'default', text = '', className } = props

  const { message, documentTitle } = useMemo(() => {
    switch (type) {
      case 'notfound':
        return {
          documentTitle: 'Page not found',
          message: `We can't seem to find the page you are looking for.`,
        }
      case 'error':
        return {
          documentTitle: 'Oops!',
          message: `Sorry, we couldn't complete your request.\n Please try refreshing this page or contact us.`,
        }
      case 'noAuth':
        return {
          documentTitle: 'Unauthenticated!',
          message: 'Unauthenticated, please login!',
        }
      default:
        return {
          documentTitle: '',
          message: text,
        }
    }
  }, [type])

  return (
    <div
      className={cn(
        'flex min-h-dvh flex-col items-center justify-center',
        className
      )}
    >
      <div className={`relative  overflow-hidden`}>
        <img
          src={logo}
          alt="shop logo"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center p-10 ">
        <h2 className=" mb-4 mt-1 text-center text-5xl font-bold text-[#242424]">
          {type === 'notfound' && 'Page not found'}
          {type === 'error' && 'Oops! Something went wrong'}
        </h2>
        <p className="mb-10 text-base text-neutral-600">{message}</p>
        {type !== 'noAuth' && (
          <Link to={'/'}>
            <Button className="mb-4">Home</Button>
          </Link>
        )}
        <a
          className="block text-base font-bold text-[#242424] no-underline hover:underline"
          href="https://www.facebook.com/profile.php?id=100011436148089"
          target="_blank"
        >
          Help
        </a>
      </div>
    </div>
  )
}
