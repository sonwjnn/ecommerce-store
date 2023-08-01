export const filterTypeOrder = (arr, order, key) => {
  const newArr = arr.filter(item => item[key].name === order)
  return newArr
}
