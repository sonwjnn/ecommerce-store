import BoardContent from '../components/BoardContent'
import { useEffect } from 'react'
const HomePage = () => {
  useEffect(() => {
    const handleHeader = () => {
      const header = document.querySelector('.header')
      if (header.classList.contains('hidden')) {
        header.classList.remove('hidden')
        header.classList.add('fixed')
      }
    }
    handleHeader()
  }, [])
  return (
    <>
      <BoardContent />
    </>
  )
}

export default HomePage
