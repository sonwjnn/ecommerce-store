export const filterTypeOrder = (arr, order, key) => {
  if (order === 'all') return arr
  const newArr = arr.filter(item => item[key].slug === order)
  return newArr
}

export const productsFilterOrganizer = (n, v, s) => {
  switch (n) {
    case 'category':
      return {
        name: s.name,
        category: v,
        price: s.price,
        rating: s.rating,
        order: s.order,
        page: s.currentPage,
        limit: s.limit,
        city: s.city,
      }
    case 'sorting':
      return {
        name: s.name,
        category: s.category,
        price: s.price,
        rating: s.rating,
        order: v,
        page: s.currentPage,
        limit: s.limit,
      }
    case 'price':
      return {
        name: s.name,
        category: s.category,
        price: v,
        rating: s.rating,
        order: s.order,
        page: s.currentPage,
        limit: s.limit,
      }
    case 'rating':
      return {
        name: s.name,
        category: s.category,
        price: s.price,
        rating: v,
        order: s.order,
        page: s.currentPage,
        limit: s.limit,
      }
    case 'pagination':
      return {
        name: s.name,
        category: s.category,
        price: s.price,
        rating: s.rating,
        order: s.order,
        page: v ?? s.currentPage,
        limit: s.limit,
      }
    default:
      return {
        name: s.name,
        category: s.category,
        price: s.price,
        rating: s.rating,
        order: s.order,
        page: s.currentPage,
        limit: s.limit,
      }
  }
}
