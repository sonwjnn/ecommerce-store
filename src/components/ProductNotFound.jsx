import { SlEmotsmile } from 'react-icons/sl'

const ProductNotFound = ({ text }) => {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <SlEmotsmile className="text-[150px] text-zinc-400" />
        <div className="gap-4 text-center text-xl">
          <div className="text-gray-500">{text}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductNotFound
