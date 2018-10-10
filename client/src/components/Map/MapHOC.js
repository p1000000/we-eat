import React from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';

import Map from "./Map";

const MapHOC = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUGpNjQ-H4t45okAePNtVfQ9odlSfgiHM&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map);

export default MapHOC;