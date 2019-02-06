import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends React.Component {
  _renderInfoWindow = (infoWindow, clickInfoWindow) => (
    <InfoWindow
      onCloseClick={clickInfoWindow}
    >
      {infoWindow}
    </InfoWindow>
  );

  _getAnimation = coordinates => {
    const { center } = this.props;
    const google = window.google; // https://github.com/tomchentw/react-google-maps/issues/434
    if (coordinates.lng === center.lng && coordinates.lat === center.lat) {
      return google.maps.Animation.BOUNCE;
    }
    return google.maps.Animation.DROP;
  };

  _renderMarkers = () => this.props.locations.map((location, index) => {
    const { coordinates, icon, infoWindow, mouseOverInfoWindow, clickInfoWindow, markerOpen } = location;
    return (
      <Marker
        key={index}
        position={coordinates}
        animation={this._getAnimation(coordinates)}
        onMouseOver={mouseOverInfoWindow}
        onMouseOut={mouseOverInfoWindow}
        onClick={clickInfoWindow}
      >
        {markerOpen && this._renderInfoWindow(infoWindow, clickInfoWindow)}
      </Marker>
    );
  });

  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        center={this.props.center}
      >
        {this._renderMarkers()}
      </GoogleMap>
    );
  }
};

Map.propTypes = {
  locations: PropTypes.array,
  center: PropTypes.object
};

Map.defaultProps = {
  locations: [],
  center: {}
};

export default Map;
