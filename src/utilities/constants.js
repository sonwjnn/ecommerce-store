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

export const bannerLogos = [
  'khung giờ săn sale',
  'hàng hiệu outlet giảm 50%',
  'mã giảm giá',
  'miễn phí vẫn chuyển',
  'bắt trend - giá sốc',
  'voucher giảm đến 200.000Đ',
  'gì cũng rẻ - mua là free ship',
  'hàng quốc tế',
  'nạp điện thoại & thẻ game'
]
