import { SlEmotsmile } from 'react-icons/sl'

const PurchaseList = () => {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-8">
        <SlEmotsmile className="text-[150px] text-zinc-300" />
        <div className="gap-4 text-center text-xl">
          <div className="text-gray-500">Bạn không có đơn hàng nào.</div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseList
