export const handleLinkImage = link => {
  return new URL(link, import.meta.url).href
}
export const shorterString = (str, len) => {
  return str.length > len ? str.substring(0, len) + '...' : str
}
