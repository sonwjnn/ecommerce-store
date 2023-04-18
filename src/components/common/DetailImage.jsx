import React from 'react'

const DetailImage = ({ urlImage }) => {
  return (
    <div
      className="w-[100px] h-[100px] bg-center bg-cover shrink-0"
      style={{
        backgroundImage: `url(${urlImage})`
      }}
    ></div>
  )
}

export default DetailImage
