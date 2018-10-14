const sortByAttr = (attr) => (a, b) => {
  switch (attr) {
    case "name":
      const first = a[attr];
      const second = b[attr];
      return first.localeCompare(second);
    case "rating":
      const firstReviews = a.reviews;
      const secondReviews = b.reviews;
      const firstRating = firstReviews.reduce((acc, el) => acc + el.rating / firstReviews.length, 0);
      const secondRating = secondReviews.reduce((acc, el) => acc + el.rating / secondReviews.length, 0);
      return firstRating - secondRating;
    case "max_delivery_time":
      return a[attr] - b[attr];
    default:
      return true;
  }
};

export default ({ restaurants = [], sortBy }) => {
  return restaurants.sort(sortByAttr(sortBy));
};