function findProductsByCategory(products, targetProduct) { //complexity O(n)
  const targetCategory = targetProduct.category;
  return products.filter(product => product.category === targetCategory);
}

function countSimilarWordsInDescription(products, targetProduct) { //complexity of O(nm), n is the number of products in the array and m is the number of words in the product description.
  const targetDescription = targetProduct.description;
  const targetWords = targetDescription.split(' ');

  return products.map(product => {
    const productWords = product.description.split(' ');
    const similarDescriptionWordsCount = targetWords.filter(targetWord => productWords.includes(targetWord)).length;
    return { ...product, similarDescriptionWordsCount };
  });
}

function countSimilarWordsInTitle(products, targetProduct) { //complexity of O(nm), n is the number of products in the array and m is the number of words in the product title.
  const targetTitle = targetProduct.title;
  const targetWords = targetTitle.split(' ');

  return products.map(product => {
    if (typeof product.title === 'string') {
      const productTitle = product.title;
      const productWords = productTitle.split(' ');
      const similarTitleWordsCount = targetWords.filter(targetWord => productWords.includes(targetWord)).length;
      return { ...product, similarTitleWordsCount };
    } else {
      return { ...product, similarTitleWordsCount: 0 };
    }
  });
}

function sortProductsByPriority(products) { //complexity O(n log n)
  const recommendedProducts = products.sort((a, b) => {
    if (a.similarTitleWordsCount > b.similarTitleWordsCount) {
      return -1;
    } else if (a.similarTitleWordsCount < b.similarTitleWordsCount) {
      return 1;
    } else {
      if (a.similarDescriptionWordsCount > b.similarDescriptionWordsCount) {
        return -1;
      } else if (a.similarDescriptionWordsCount < b.similarDescriptionWordsCount) {
        return 1;
      } else {
        return 0;
      }
    }
  }).map(({ ...rest }) => rest);

  return recommendedProducts
}

const getRecommendedProducts = (products, targetProduct) => {  //overall time complexity O(nm) n - number of products, m - number of words in the product description or title
  const result1 = findProductsByCategory(products, targetProduct)
  const result2 = countSimilarWordsInDescription(result1, targetProduct)
  const result3 = countSimilarWordsInTitle(result2, targetProduct)
  return sortProductsByPriority(result3)
}

module.exports = getRecommendedProducts