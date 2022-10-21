import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';

function ImagePicker({onTakeImage}) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted; // true => got permission, false not yet got
        } //not yet got permission

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant camera permissions to use this app.'
              );
            return false
        } //user denied permission

        return true; // permission got
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions(); // checking if we got permission

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true, // allow editting the phot before taking it
            aspect: [16,9],
            quality: 0.5,
        }); // wait for photo to be taken

        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }

    let ImagePreview = <Text>No Image Taken yet.</Text>
    
    if(pickedImage){
        ImagePreview = <Image style={styles.image} source={{uri:pickedImage}} /> // image has been clicked to preview this
    }

    return (
        <View>
        <View style={styles.imagePreview}>
            {ImagePreview} 
        </View>
        <OutlinedButton icon="camera" onPress={takeImageHandler}> Take Image </OutlinedButton>
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });