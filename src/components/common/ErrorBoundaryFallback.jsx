import { Button } from '../ui/button'
import logo from '/images/logos/logo_header_2.svg'

function ErrorBoundaryFallback(props) {
  const { error, resetErrorBoundary } = props

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[url('/images/background.png')]">
      <div className={`relative  overflow-hidden`}>
        <img
          src={logo}
          alt="shop logo"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center p-10 ">
        <h2 className=" mb-4 mt-1 text-center text-5xl font-bold text-[#242424]">
          {'Oops! Something went wrong'}
        </h2>
        <p className="mb-10 text-base text-neutral-700">{error.message}</p>
        <Button className="mb-4 text-base" onClick={resetErrorBoundary}>
          Reset page
        </Button>
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

export default ErrorBoundaryFallback
