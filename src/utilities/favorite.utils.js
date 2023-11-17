const favoriteUtils = {
  check: ({ listFavorites, productId }) =>
    listFavorites &&
    listFavorites.find(e => e.productId._id === productId) !== undefined,
}

export default favoriteUtils
