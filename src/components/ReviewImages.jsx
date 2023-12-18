import { useEffect, useState } from 'react'
import { MdOutlineZoomOutMap } from 'react-icons/md'
import { PhotoView } from 'react-photo-view'
import { PhotoProvider } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

import { Skeleton } from './ui/skeleton'

const ReviewImages = ({ images }) => {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (images.length) {
      setImageUrl(images[0]?.url)
    }
  }, [images])

  return (
    <PhotoProvider maskOpacity={0.5}>
      <PhotoView src={imageUrl}>
        <div className="aspect-square w-full cursor-pointer overflow-hidden rounded-md border border-accent lg:min-w-[450px]">
          {imageUrl ? (
            <div
              className="group relative aspect-square  bg-cover bg-center transition duration-500 ease-in-out hover:scale-110 "
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            >
              <div className="absolute inset-0 rounded-md bg-black opacity-0 transition group-hover:opacity-30">
                <div className="flex h-full w-full items-center justify-center ">
                  <MdOutlineZoomOutMap color="#ffffff" size={100} />
                </div>
              </div>
            </div>
          ) : (
            <Skeleton className="aspect-square w-full" />
          )}
        </div>
      </PhotoView>

      <div className="mt-2 flex gap-x-2  ">
        {images.length ? (
          <>
            {images.map(image => (
              <PhotoView key={image.public_id} src={image.url}>
                <div className="aspect-square h-[100px] w-[100px] overflow-hidden rounded-md">
                  <div
                    className="group relative aspect-square cursor-pointer bg-cover bg-center transition duration-500 ease-in-out hover:scale-110"
                    onMouseEnter={() => setImageUrl(image.url)}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  >
                    <div className="absolute inset-0 rounded-md bg-black opacity-0 transition group-hover:opacity-30">
                      <div className="flex h-full w-full items-center justify-center ">
                        <MdOutlineZoomOutMap color="#ffffff" size={36} />
                      </div>
                    </div>
                  </div>
                </div>
              </PhotoView>
            ))}
          </>
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-square h-[100px] w-[100px]  rounded-md"
            />
          ))
        )}
      </div>
    </PhotoProvider>
  )
}

export default ReviewImages
