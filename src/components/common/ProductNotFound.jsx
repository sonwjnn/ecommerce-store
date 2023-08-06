import { SlEmotsmile } from 'react-icons/sl'

const NotFoundProduct = ({ text }) => {
  return (
    <div className="h-[50vh] w-full flex items-center justify-center ">
      <div className="flex flex-col gap-8 items-center justify-center">
        <SlEmotsmile className="text-[150px] text-zinc-400" />
        <div className="gap-4 text-[20px] text-center">
          <div className="text-gray-500">{text}</div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundProduct
