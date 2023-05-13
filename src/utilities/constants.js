export const handleLinkImage = link => {
  return new URL(link, import.meta.url).href
}
export const shorterString = (str, len) => {
  return str.length > len ? str.substring(0, len) + '...' : str
}

export const maskedEmail = (email, hiddenChars) => {
  const visibleChars = email.substring(0, 2)
  const maskedEmail =
    visibleChars + hiddenChars + email.substring(email.indexOf('@'))
  return maskedEmail
}
