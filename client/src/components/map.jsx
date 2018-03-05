import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  return <GoogleMap
          defaultZoom={15}
          defaultCenter={{lat: props.lat, lng: props.lng}}
          >
          {props.isMarkerShown &&
            <Marker position={{lat: props.lat, lng: props.lng}} />
          }
        </GoogleMap>
      }
));

class MapComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false
    }
  }
  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({isMarkerShown: true})
    }, 3000)
  }

  handleMarkerClick() {
    this.setState({isMarkerShown: false})
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-02gMrf0E5Df_WC4Pv6Uf9Oc0cEdiMBg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onMarkerClick={this.handleMarkerClick}
        lat={this.props.lat}
        lng={this.props.lng}
      />
    )
  }
}

export default MapComponent;
