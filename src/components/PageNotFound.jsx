import { useNavigate } from 'react-router-dom'

import { Button } from './ui/button'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div class="container mt-36 h-dvh">
      <div class="flex justify-center">
        <img src="/src/assets/images/gifs/giphy.gif" alt="gif_ing" />
      </div>
      <div class="mt-12  flex flex-col items-center justify-center gap-y-4 ">
        <h1 class="text-3xl font-bold">This page is gone.</h1>
        <p className="text-sm leading-3 text-gray-500">
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <Button className="max-w-[200px]" onClick={() => navigate('/')}>
          Back to home
        </Button>
      </div>
    </div>
  )
}

export default PageNotFound
