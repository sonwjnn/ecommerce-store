import { setAppState } from '@/services/redux/features/appStateSlice.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch()

  //Scroll to top and set new AppState, state of pages (route.state)
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setAppState(state))
  }, [state, dispatch])
  return children
}

export default PageWrapper
