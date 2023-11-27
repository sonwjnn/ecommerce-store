import { cn } from '@/lib/utils'

const NotFound = ({ className, text }) => {
  return (
    <div
      className={cn(
        'flex h-[50vh] w-full items-center justify-center',
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <svg
          width="128"
          height="128"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#a3a3a3"
            d="m1757 1408l35 313q3 28-16 50q-19 21-48 21H64q-29 0-48-21q-19-22-16-50l35-313h1722zm-93-839l86 775H42l86-775q3-24 21-40.5t43-16.5h256v128q0 53 37.5 90.5T576 768t90.5-37.5T704 640V512h384v128q0 53 37.5 90.5T1216 768t90.5-37.5T1344 640V512h256q25 0 43 16.5t21 40.5zm-384-185v256q0 26-19 45t-45 19t-45-19t-19-45V384q0-106-75-181t-181-75t-181 75t-75 181v256q0 26-19 45t-45 19t-45-19t-19-45V384q0-159 112.5-271.5T896 0t271.5 112.5T1280 384z"
          />
        </svg>
        <div className="gap-4 text-center text-xl">
          <div className="text-gray-500">{text}</div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
