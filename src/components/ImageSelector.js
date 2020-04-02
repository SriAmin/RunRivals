import React, { useState } from 'react';
import {View, Image, StyleSheet, Button, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const ImageSelector = (props) => {
    //Used to track permissions to take or select images
    const [hasPermission, setPermission] = useState(null);
    
    //Ask permission to access camera roll
    const getImagePermission = async (props) => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setPermission(status === 'granted');
            if (status !== 'granted') {
                alert("Unless you want the default image, we need your permissions to access your photots");
            }
        } 
    }

    //Ask permissions to access camera
    const getCameraPermission = async (props) => {
        const {status} = await Camera.requestPermissionsAsync();
        setPermission(status === 'granted');
        if (status !== 'granted') {
            alert("Unless you want the default image, we need your permissions to access your photots");
        }
    }

    //Triggers camera roll event to allow user to pick profile image
    const pickImage = async () => {
        getImagePermission();
        let result;
        if (hasPermission) {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
            })
        }
        console.log(result);

        if (!result.cancelled) {
            props.setPhoto(result.uri);
        }
    }

    //Triggers camera event to allow users to take a picture
    const takeImage = async () => {
        getCameraPermission();
        let result;
        if (hasPermission) {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true
            });
        }
        console.log(result);
        if (!result.cancelled) {
            props.setPhoto(result.uri);
        }
    }

    return <View style = {styles.container}>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress = {() => pickImage()} style={styles.buttonStyle}>
                        <Text style={{fontSize: 15,}}>Pick an Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => takeImage()} style={styles.buttonStyle}>
                        <Text style={{fontSize: 15,}}>Take an Image</Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.imageStyle} source={{uri: props.photoUri}}/>
            </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyle: {
        borderWidth: 3,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: "#9ed2a1",
        borderRadius: 50,
        marginHorizontal: 15,
    },
    imageStyle: {
        width: 200, 
        height: 200, 
        borderWidth: 1, 
        borderRadius: 50,
        marginVertical: 25,
    },
});

export default ImageSelector;