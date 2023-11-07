const Avatar = ({ children, backgroundColor }) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center overflow-hidden rounded-full  text-xs text-white`}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </div>
  )
}

export default Avatar
