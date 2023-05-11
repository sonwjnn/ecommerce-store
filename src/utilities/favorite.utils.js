const favoriteUtils = {
  check: ({ listFavorites, productId }) =>
    listFavorites &&
    listFavorites.find(e => e.productId === productId) !== undefined
}

export default favoriteUtils
