const filterByAttr = (attr, filter, restaurant) => {
  switch (attr) {
    case "search":
      return restaurant.name.toLowerCase().includes(filter.toLowerCase());
    case "cuisine":
      return filter === "" || restaurant.cuisine.name.toLowerCase() === filter.toLowerCase();
    case "max_delivery_time":
      return filter === 0 || restaurant[attr] <= filter;
    case "rating":
      const { reviews } = restaurant;
      const rating = restaurant.reviews.reduce((acc, { rating }) =>
        acc + rating / restaurant.reviews.length
      , 0);
      return filter === 0 || rating >= filter;
    case "accepts_10bis":
      return !filter || restaurant.accepts_10bis;
    default:
      return true;
  }
};

export default ({ restaurants = [], filters }) => {
  return restaurants.filter(restaurant => {
    return Object.keys(filters).every(key => filterByAttr(key, filters[key], restaurant));
  });
};