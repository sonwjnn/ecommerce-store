import BoardContent from '../components/BoardContent'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
const HomePage = () => {
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
