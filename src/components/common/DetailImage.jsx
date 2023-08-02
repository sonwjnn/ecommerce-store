const DetailImage = ({ imageUrl }) => {
  return (
    <div
      className="w-[100px] h-[100px] bg-center bg-cover shrink-0"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    ></div>
  )
}

export default DetailImage
