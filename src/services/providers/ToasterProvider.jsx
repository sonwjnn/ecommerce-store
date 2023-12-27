import { Toaster } from 'react-hot-toast'

const toastOptions = {
  style: {
    background: '#fff',
    color: '#333',
    fontSize: '16px',
  },
  position: 'bottom-center',
}

export const ToasterProvider = () => {
  return <Toaster toastOptions={toastOptions} />
}
