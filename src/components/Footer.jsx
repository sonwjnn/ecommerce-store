import { socialNetworkLinks } from '@/utilities/constants'
import { useEffect, useState } from 'react'
import { MdArrowUpward } from 'react-icons/md'

import { Button } from './ui/button'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])
  return (
    <section class="mt-12 bg-white">
      <div class="relative mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
          <div class="px-5 py-2">
            <a
              href="#"
              class="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              About
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="#"
              class="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Blog
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="#"
              class="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Team
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="#"
              class="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Pricing
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="#"
              class="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Contact
            </a>
          </div>
          <div class="px-5 py-2">
            <a
              href="#"
              class="text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              Terms
            </a>
          </div>
        </nav>
        <p class=" text-center text-base leading-6 text-gray-500">
          © {new Date().getFullYear()} Sonwjn Shopping.
        </p>
        <div class=" flex justify-center space-x-4">
          {socialNetworkLinks.map(item => {
            const Icon = item.icon
            return (
              <a
                className="flex items-center justify-center gap-x-2 rounded-full text-[#605f5f] hover:brightness-110"
                key={item.title}
                href={item.link}
                target="_blank"
              >
                <Icon size={42} />
              </a>
            )
          })}
        </div>
        {isVisible ? (
          <Button
            variant="outline"
            className="absolute right-0 top-4 hover:bg-primary hover:text-white"
            size="icon"
            onClick={scrollToTop}
          >
            <MdArrowUpward size={20} />
          </Button>
        ) : null}
      </div>
    </section>
  )
}

export default Footer
