import React from 'react';
import styled from 'styled-components';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {notify} from 'react-notify-toast';

import Hero from "../components/Hero";
import RestaurantList from "../components/RestaurantList";
import Map from "../components/Map";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RestaurantItem from "../components/RestaurantItem";
import Hamburger from "../components/Hamburger";

import asyncRequest from "../services/asyncRequest";
import filterRestaurants from "../helpers/filterRestaurants";
import sortRestaurants from "../helpers/sortRestaurants";

const Content = styled("div")`
  display: flex;
  height: calc(100vh - 450px);
`;

const ListWrapper = styled("div")`
  width: 30%;
  height: 100%;
  overflow-y: scroll;
`;

const MapWrapper = styled("div")`
  width: 70%;
`;

const SearchBarWrapper = styled("div")`
  position: absolute;
  left: 50%;
  top: 65%;
  transform: translate(-50%,0);
  width: 20%;
`;

const HamburgerWrapper = styled("div")`
  display: flex;
  height: calc(100vh - 450px);
`;

class restaurants extends React.Component {
  state = {
    fetching: true,
    restaurants: [],
    cuisines: [],
    filters: {
      search: "",
      cuisine: "",
      max_delivery_time: 0,
      rating: 0,
      accepts_10bis: false
    },
    sortBy: "",
    center: { lat: 40.7489438, lng: -73.9811553 }
  };

  componentDidMount() {
    const promises = [
      this._getRestaurants(),
      this._getCuisines()
    ];
    Promise.all(promises)
      .then(() => this.setState({
        fetching: false
      })).catch(e => {
        console.log(e);
      });
  }

  _promiseWrapper = (url, callback) => new Promise((resolve, reject) => {
    asyncRequest({
      url
    }).then(data => {
      callback(data);
      resolve();
    }).catch(e => {
      reject(e);
    });
  });

  _getRestaurants = () => this._promiseWrapper(
    '/api/v1.0/restaurants',
    (data) => {
      this.setState({
        restaurants: data.map(restaurant => (
          {
            ...restaurant,
            markerOpen: {
              click: false,
              mouseover: false
            },
            ByClick: false
          }
        ))
      });
    }
  );

  _getCuisines = () => this._promiseWrapper(
    '/api/v1.0/cuisines',
    (data) => {
      this.setState({
        cuisines: data
      });
    }
  );

  _createNotification = ({ type, title = "", message = "", timeout = 3000 }) => {
    switch (type) {
      case "info":
        NotificationManager.info(message);
        break;
      case "success":
        NotificationManager.success(message, title, timeout);
        break;
      case "warning":
        NotificationManager.warning(message, title, timeout);
        break;
      case "error":
        NotificationManager.error(message, title, timeout);
    }
  };

  _createOrder = (restaurant_name, customer_name) => {
    asyncRequest({
        method: "post",
        url: "/api/v1.0/deliveries_manager/deliveries?name=" + customer_name
    }).then(() => {
        notify.show("Your Order from " + restaurant_name + " is on the way!", "success");
    }).catch(e => {
        notify.show("Oops, something went wrong. Order was not received, try again later.", "error");
    });
  };

  _addReview = (review) => {
    asyncRequest({
      method: "post",
      url: "/api/v1.0/reviews",
      data: {
        review
      }
    }).then(data => {
      this._createNotification({
        type: "success",
        title: "Review Added",
        message: "Thank you!"
      });
      this.setState(({ restaurants }) => (
        {
          restaurants: restaurants.map(restaurant => {
            if (restaurant.id === data.restaurant_id) {
              const reviews = restaurant.reviews;
              return {
                ...restaurant,
                reviews: [
                  ...reviews,
                  data
                ]
              };
            }
            return restaurant;
          })
        }
      ));
    }).catch(e => {
        notify.show('Review Not Added', 'error');
      console.log(e);
    });
  };

  _onRestaurantSelect = coordinates => this.setState({
    center: coordinates
  });

  _renderRestaurants = (restaurants) => (
    <ListWrapper>
      <RestaurantList
        restaurants={restaurants}
        addReview={this._addReview}
        createOrder={this._createOrder}
        onSelect={this._onRestaurantSelect}
      />
    </ListWrapper>
  );

  _getLocations = restaurants => restaurants.map(restaurantProps => {
    return {
      coordinates: restaurantProps.coordinates,
      icon: restaurantProps.cuisine.icon,
      infoWindow: (
        <RestaurantItem
          compact
          icon={restaurantProps.cuisine.icon}
          {...restaurantProps}
        />
      ),
      mouseOverInfoWindow: (e) => this.setState(state => {
        const eventType = "mouseover";
        return {
          ...state,
          restaurants: state.restaurants.map(restaurant => {
            if (restaurant.id === restaurantProps.id) {
              restaurant.markerOpen[eventType] = !restaurant.markerOpen[eventType];
            }
            return restaurant;
          })
        };
      }),
      clickInfoWindow: (e) => this.setState(state => {
        const eventType = "click";
        return {
          ...state,
          restaurants: state.restaurants.map(restaurant => {
            if (restaurant.id === restaurantProps.id) {
              restaurant.markerOpen[eventType] = !restaurant.markerOpen[eventType];
            }
            return restaurant;
          })
        };
      }),
      markerOpen: restaurantProps.markerOpen.click || restaurantProps.markerOpen.mouseover
    }
  });

  _renderMap = (restaurants) => (
    <MapWrapper>
      <Map
        locations={this._getLocations(restaurants)}
        center={this.state.center}
      />
    </MapWrapper>
  );

  _renderContent = (restaurants) => (
      <Content>
        {this._renderRestaurants(restaurants)}
        {this._renderMap(restaurants)}
      </Content>
    );

  _onChange = (filter) => (e, val) => {
    const value = val !== undefined ? val : e.target !== undefined ? e.target.value : e;
    return this.setState({
      filters: {
        ...this.state.filters,
        [filter]: value
      }
    });
  };

  _renderHero = () => (
    <Hero>
      <SearchBarWrapper>
        <SearchBar
          value={this.state.filters.search}
          onChange={this._onChange("search")}
        />
      </SearchBarWrapper>
    </Hero>
  );

  _onSort = (e) => this.setState({
    sortBy: e.target.value
  });

  _renderFilters = () => {
    const { sortBy, filters } = this.state;
    const { cuisine, max_delivery_time, rating, accepts_10bis } = filters;
    return (
      <Filters
        cuisine={cuisine}
        cuisines={this.state.cuisines}
        max_delivery_time={max_delivery_time}
        rating={rating}
        accepts_10bis={accepts_10bis}
        sort={{ sortBy, onSort: this._onSort }}
        onChange={this._onChange}
      />
    ); 
  };

  _renderPage = (restaurants) => {
    if (this.state.fetching) {
      return (
        <HamburgerWrapper>
          <Hamburger />
        </HamburgerWrapper>
      );
    }
    return (
      <div>
        {this._renderFilters()}
        {this._renderContent(restaurants)}
      </div>
    );
  };

  render() {
    const filteredRestaurants = filterRestaurants({
      restaurants: this.state.restaurants,
      filters: this.state.filters
    });
    const restaurants = sortRestaurants({
      restaurants: filteredRestaurants,
      sortBy: this.state.sortBy
    });
    return (
      <div>
        {this._renderHero()}
        {this._renderPage(restaurants)}
        <NotificationContainer />
      </div>
    );
  }
}

export default restaurants;