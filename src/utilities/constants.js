export const handleLinkImage = link => {
  return new URL(link, import.meta.url).href
}
