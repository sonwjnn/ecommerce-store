const Avatar = ({ children, backgroundColor }) => {
  return (
    <div className="flex justify-center items-center w-full h-full relative">
      <div
        className={`flex items-center justify-center text-[12px] absolute top-0 right-0 left-0 bottom-0 text-white  overflow-hidden rounded-full`}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </div>
  )
}

export default Avatar
