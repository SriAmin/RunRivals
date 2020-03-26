import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const ImageSelector = (props) => {
    //Ask the user for permissions
    const getPermissions = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert("Unless you want the default image, we need your permissions to access your photots");
            }
        }    
    }

    //Triggers camera roll event to allow user to pick profile image
    const pickImage = async () => {
        getPermissions();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        })
        console.log(result);

        if (!result.cancelled) {
            props.setPhoto(result.uri);
        }
    }

    return <TouchableOpacity onPress = {() => pickImage()}>
                <Image style={styles.imageStyle} source={{uri: props.photoUri}}/>
            </TouchableOpacity>
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 200, 
        height: 200, 
        borderWidth: 1, 
        borderRadius: 50,
    },
});

export default ImageSelector;