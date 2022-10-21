import { View, StyleSheet, Text, Image } from 'react-native';
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
} from 'expo-location';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { getAddress, getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

function LocationPicker({onPickLocation}) {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused()
    const [pickedLocation,setPickedLocation] = useState();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    useEffect(()=>{
        if(isFocused && route.params){ // re renders everytime it is updated is to see preview
            const mapPickedLocation = route.params && {
                lat: route.params.pickedLat, lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation)
        }   
    },[route,isFocused])

    useEffect(()=> {
        async function handleLocation(){
            if(pickedLocation){
                const address = getAddress(pickedLocation.lat,pickedLocation.lng)
                onPickLocation({...pickedLocation,address:address});
            }
        }
        handleLocation();
    }, [pickedLocation,onPickLocation]); // prevent unnecessary rendering of this

    async function verifyPermission(){
        if(locationPermissionInformation.status === PermissionStatus.UNDERTERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted; // true => got permission, false not yet got
        } //not yet got permission

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
              );
            return false
        } //user denied permission

        return true; // permission got
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermission();

        if(!hasPermission){
            return;
        }
        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude
        })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet</Text>

    if(pickedLocation){
        locationPreview = (
            <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat,pickedLocation.lng)}} />
        )
    }

    return(
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  },
});