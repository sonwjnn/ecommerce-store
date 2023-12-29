import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
} from '../components/common/Icon'

export const socialNetworkLinks = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/profile.php?id=100011436148089',
    icon: FacebookIcon,
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/sonn_wjh/',
    icon: InstagramIcon,
  },
  {
    title: 'Github',
    link: 'https://github.com/sonwjnn',
    icon: GithubIcon,
  },
]

export const SHIPPING_PRICE = [
  { name: 'Miễn phí', price: 0 },
  { name: 'Tiêu chuẩn', price: 5000 },
  { name: 'Hỏa tốc', price: 10000 },
]

export const PAYMENTS = [
  { name: 'Thanh toán khi nhận hàng', value: 'COD' },
  { name: 'Thanh toán qua Stripe', value: 'PREPAID' },
]
