const Avatar = ({ children, backgroundColor }) => {
  return (
    <div className="flex justify-center items-center ">
      <div
        className={`flex items-center justify-center text-[12px] text-white w-20 h-20 mx-2 overflow-hidden rounded-full`}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </div>
  )
}

export default Avatar
