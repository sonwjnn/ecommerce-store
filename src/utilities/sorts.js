export const mapOrder = (arr, order, key) => {
  arr.sort((a, b) => {
    if (order && order === 'dec') return b[key] - a[key]
    return a[key] - b[key]
  })
  return arr
}
