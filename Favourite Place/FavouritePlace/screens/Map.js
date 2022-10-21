import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

function Map({navigation, route}) {
    const initialLocation = route.params && {
        lat:route.params.lat,
        lng:route.params.lng
    };

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const region = {
        latitude: initialLocation ? initialLocation.lat: 43.26, //center
        longitude: initialLocation ? initialLocation.lng: -134.7, //center
        latitudeDelta:0.0872, //zoom
        longitudeDelta:0.0456, //zoom
    }

    function selectedLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({lat:lat,lng:lng})
    }

    const savePickedLocationHandler = useCallback(() => { // prevent re rendering over and over again that is why useCallback
        if(!selectedLocation){
            Alert.alert(
                'No location picked!',
                'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }

        navigation.navigate('AddPlace',{
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        },[navigation,selectedLocation])
    },[navigation, selectedLocation])

    useLayoutEffect(() =>{ // like useEffect
        if(initialLocation){
            return;
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                  icon="save"
                  size={24}
                  color={tintColor}
                  onPress={savePickedLocationHandler}
                />
            ),
        })
    },[[navigation, savePickedLocationHandler, initialLocation]]) 

    return(
        <MapView style={styles.map} initialRegion={region} onPress={selectedLocationHandler}>
            {selectedLocation &&( // render marker only if there are markers else dont 
                <Marker     
                    title="Picked Location"
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                    }}
                />
            )}
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});