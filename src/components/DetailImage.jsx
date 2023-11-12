const DetailImage = ({ imageUrl }) => {
  return (
    <div
      className="h-[100px] w-[100px] shrink-0 bg-accent bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
  )
}

export default DetailImage
