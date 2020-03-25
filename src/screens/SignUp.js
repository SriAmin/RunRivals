import React, { useState, useEffect, Component } from 'react';
import {View, TextInput, StyleSheet, Text, Button, Dimensions, Animated} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const SignUp = (props) => {
    let display;

    let [sequence, setSequence] = useState(props.navigation.getParam('sequence'));

    //Setting all state variables for user data
    let [email, setEmail] = useState(props.navigation.getParam('email'));
    let [phoneNum, setPhoneNum] = useState("");
    let [password, setPassword] = useState("");

    let [photoUri, setPhotoUri] = useState(props.navigation.getParam('photoUrl'));
    let [name, setName] = useState(props.navigation.getParam('name'));
    
    let [weight, setWeight] = useState("");
    let [height, setHeight] = useState("");
    let [goal, setGoal] = useState("");
    
    //Setting state variable for animating opacity
    let [fadeAnim, setFade] = useState(new Animated.Value(0))
    let [slideAnim, setSlide] = useState(new Animated.Value(0));
    let fadeIn = Animated.timing ( fadeAnim, {toValue: 1, duration: 1000,});
    let progressSlide = Animated.timing ( slideAnim, {toValue: Dimensions.get('window').width / (3 - sequence), duration: 1000});

    //Called to change the sequeunce and display different inputs
    let updateSequence = () => {
        let temp = sequence + 1;
        setFade(new Animated.Value(0));
        setSequence(temp);
    }

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
            setPhotoUri(result.uri);
        }
    }

    //1st Screen - Basic Authentication - Email, Phone Number, Password
    if (sequence == 0) {
        display = (
                <Animated.View style={[styles.inputContainer, {opacity: fadeAnim,}]}>
                    <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.textInput} placeholder="Phone Number" value={phoneNum} onChangeText={(text) => setPhoneNum(text)} />
                    <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                    <TouchableOpacity  onPress={() => updateSequence()}>
                        <Text style={styles.btnStyle}>Next</Text>
                    </TouchableOpacity>
                </Animated.View>
        )

        fadeIn.start();
        progressSlide.start();    
    }
    //2nd Screen - Social Data - Profile Picture, and Display Name
    else if (sequence == 1) {
        display = (
                <Animated.View style={[styles.inputContainer, {opacity: fadeAnim,}]}>
                    <TouchableOpacity onPress = {() => pickImage()}>
                        <Animated.Image style={styles.imageStyle} source={{uri: photoUri}}/>
                    </TouchableOpacity>
                    <TextInput style={styles.textInput} placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
                    <TouchableOpacity  onPress={() => updateSequence()}>
                        <Text style={styles.btnStyle}>Next</Text>
                    </TouchableOpacity>
                </Animated.View>
        )

        fadeIn.start();
        progressSlide.start();
    }
    //3rd Screen - Fitness Data - Weight, Height, Goal (Distance to reach each weekend)
    else {

        display = (
                <Animated.View style={[styles.inputContainer, {opacity: fadeAnim,}]}>
                    <TextInput style={styles.textInput} placeholder="Weight" value={weight} onChangeText={(text) => setWeight(text)} />
                    <TextInput style={styles.textInput} placeholder="Height" value={height} onChangeText={(text) => setHeight(text)} />
                    <TextInput style={styles.textInput} placeholder="Goal" value={goal} onChangeText={(text) => setGoal(text)} />
                    <TouchableOpacity  onPress={() => {
                        alert(`Thanks for Signing In \n Email: ${email}\n Phone Number: ${phoneNum}\n Password: ${password}\n Photo URI: ${photoUri}\n Name: ${name}\n Weight: ${weight}\n Height: ${height}\n Goal: ${goal} `)}}>
                        <Text style={styles.btnStyle}>Next</Text>
                    </TouchableOpacity>
                </Animated.View>
        )

        fadeIn.start();
        progressSlide.start();
    }

    return <View style={styles.container}>
        <Animated.View style={{height: 5, backgroundColor: '#00b4cf', width: slideAnim}}/>
        {display}
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        width: 200, 
        height: 200, 
        borderWidth: 1, 
        borderRadius: 50,
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    textInput: {
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 25,
        marginHorizontal: 10,
        marginVertical: 15,
        width: 325
    },
    btnStyle: {
        fontSize: 20,
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#00b4cf',
        padding: 10,
        paddingLeft: 55,
        paddingRight: 55,
        marginTop: 50,
    }
});

export default SignUp;