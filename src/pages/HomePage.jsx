import BoardContent from '../components/BoardContent'
import { useEffect } from 'react'
import { fixed } from '../utilities/constants'
import { useLocation } from 'react-router'
const HomePage = () => {
  const location = useLocation()
  useEffect(() => {
    const header = document.querySelector('.header')
    fixed(header)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <BoardContent />
    </>
  )
}

export default HomePage
