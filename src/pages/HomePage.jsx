import BoardContent from '../components/BoardContent'
import { useEffect } from 'react'
import { fixed } from '../utilities/constants'
const HomePage = () => {
  useEffect(() => {
    const header = document.querySelector('.header')
    fixed(header)
  }, [])
  return (
    <>
      <BoardContent />
    </>
  )
}

export default HomePage
