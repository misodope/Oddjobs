import React from 'react';
import axios from 'axios';

import {compose, withProps, lifecycle} from "recompose";
import {withScriptjs} from "react-google-maps";
import {StandaloneSearchBox} from "react-google-maps/lib/components/places/StandaloneSearchBox";
import 'grommet/scss/hpinc/index.scss';
import TextInput from 'grommet/components/TextInput';
import GrommetApp from 'grommet/components/App';
import FormField from 'grommet/components/FormField';

const GoogleSearchBox = compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB-02gMrf0E5Df_WC4Pv6Uf9Oc0cEdiMBg&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div/>,
  containerElement: <div/>
}),
lifecycle({
  componentWillMount() {
    const refs = {}

    this.setState({
      places: [],
      address: '',
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        axios.post('/current/address', {location: places})
        .catch((error) => {
          throw error
        })
      }
    })
  }
}), withScriptjs)(props =>
    <FormField label='Address' help='Please press Enter/Return to confirm address.'>
      <StandaloneSearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} onPlacesChanged={props.onPlacesChanged}>
        <TextInput type="text" placeHolder='Enter an address'/>
      </StandaloneSearchBox>
    </FormField>
);

export default GoogleSearchBox;
