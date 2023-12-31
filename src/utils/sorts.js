export const mapOrder = (arr, order, key) => {
  arr.sort((a, b) => {
    if (order && order === 'dec') return b[key] - a[key]
    return a[key] - b[key]
  })
  return arr
}

export const getSortOrder = value => {
  let sortOrder = {}
  switch (value) {
    case 0:
      sortOrder._id = -1
      break
    case 1:
      sortOrder.discountPrice = -1
      break
    case 2:
      sortOrder.discountPrice = 1
      break

    default:
      break
  }

  return sortOrder
}
