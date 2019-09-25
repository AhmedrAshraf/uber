import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import DestinationButton from "./compunent/Destinationbutton";
import CurLocationButton from "./compunent/Currlocationbut";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
    }
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted')
      console.log('permission denied');

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    this.setState({ region: region })

  }

  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta, } = this.state.region;

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <DestinationButton />
        <CurLocationButton cb={() => { this.centerMap() }} />
        <MapView
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          ref={(map) => {this.map = map}}
          rotateEnabled={false}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
