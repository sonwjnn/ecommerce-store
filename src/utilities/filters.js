export const filterTypeOrder = (arr, order, key) => {
  if (order === 'all') return arr
  const newArr = arr.filter(item => item[key].name === order)
  return newArr
}
