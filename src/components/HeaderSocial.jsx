import { socialNetworkLinks } from '@/utilities/constants'

const HeaderSocial = () => {
  return (
    <ul className="nav-list text-sm">
      <a
        href="https://admin-shopee-clone.onrender.com/"
        target="_blank"
        className="nav-list-item"
      >
        Kênh người bán
      </a>

      <li className="nav-list-item nav-list-item--separate flex gap-x-2">
        <span className="header__nav-title--no-pointer">Kết nối</span>
        <div className="flex gap-x-1">
          {socialNetworkLinks.map(item => {
            const Icon = item.icon
            return (
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full hover:brightness-110"
                key={item.title}
                href={item.link}
                target="_blank"
              >
                <Icon className="text-lg text-white" />
              </a>
            )
          })}
        </div>
      </li>
    </ul>
  )
}

export default HeaderSocial
