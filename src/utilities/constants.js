import { FacebookIcon, GithubIcon, InstagramIcon } from '../components/Icon'

export const handleLinkImage = link => {
  return new URL(link, import.meta.url).href
}
export const shorterString = (str, len) => {
  return str.length > len ? str.substring(0, len) + '...' : str
}

export const maskedEmail = email => {
  const hiddenChars = '***********'
  const visibleChars = email.substring(0, 2)
  const maskedEmail =
    visibleChars + hiddenChars + email.substring(email.indexOf('@'))
  return maskedEmail
}

export const handleUrl = url => {
  // Use a dummy anchor element to handle URL resolution
  const anchor = document.createElement('a')
  anchor.href = url

  // Extract the base URL of the deployed application
  const deployedBaseUrl = anchor.href.replace(anchor.pathname, '')

  // Resolve the provided URL relative to the deployed base URL
  const resolvedUrl = new URL(url, deployedBaseUrl).href

  return resolvedUrl
}

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

export const formatPriceToVND = price => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  return formatter.format(price)
}

export const SHIPPING_PRICE = [
  { name: 'Miễn phí', price: 0 },
  { name: 'Tiêu chuẩn', price: 5000 },
  { name: 'Hỏa tốc', price: 10000 },
]

export const PAYMENTS = [
  { name: 'Thanh toán khi nhận hàng', value: 'COD' },
  { name: 'Thanh toán qua Stripe', value: 'PREPAID' },
]
