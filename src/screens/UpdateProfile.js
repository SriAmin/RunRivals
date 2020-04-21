import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageSelector from '../components/ImageSelector'

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);


const UpdateProfile = (props) => {
    let display;

    let [sequence, setSequence] = useState(0);

    //Setting all state variables for user data
    let [email, setEmail] = useState(props.navigation.getParam('email'));
    let [password, setPassword] = useState(props.navigation.getParam('password'));

    let [photoUri, setPhotoUri] = useState(props.navigation.getParam('photoUrl'));
    let [name, setName] = useState(props.navigation.getParam('name'));
    
    let [weight, setWeight] = useState(props.navigation.getParam('weight'));
    let [height, setHeight] = useState(props.navigation.getParam('height'));
    
    //Setting state variable for animating opacity
    let [fadeAnim, setFade] = useState(new Animated.Value(0))
    let [slideAnim, setSlide] = useState(new Animated.Value(0));
    let [inputSlide, setInputSlide] = useState(new Animated.Value(0));

    let fadeIn = Animated.timing ( fadeAnim, {toValue: 1, duration: 1000,});
    let progressSlide = Animated.timing ( slideAnim, {toValue: Dimensions.get('window').width / (3 - sequence), duration: 1000});
    let textSlide = Animated.timing ( inputSlide, {toValue: Dimensions.get('window').width / 1.25, duration: 1000});

    //Called to change the sequeunce and display different inputs
    let updateSequence = () => {
        let temp = sequence + 1;
        setFade(new Animated.Value(0));
        setInputSlide(new Animated.Value(0));
        setSequence(temp);
    }

    let loadAnimation = () => { textSlide.start(); fadeIn.start(); progressSlide.start(); }

    //Access AWS DataStore to get and submit data
    let updateData = async () => {
        //This will grab the data and check if email already exist
        let users = await DataStore.query(User);
        let isValid = true;
        users.forEach(element => {
            if (email == element.email) {
                isValid = false
            }
        });

        //If email doesn't exist then it'll save new user data into the cloud
        if (isValid) {
        }
        else {
        }
    }

    //1st Screen - Basic Authentication - Email, Phone Number, Password
    if (sequence == 0) {
        display = <Animated.View style={[styles.inputContainer, {opacity: fadeAnim,}]}>
                    <Animated.View style={{width: inputSlide}}>
                        <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} autoCapitalize="none" />
                        <TextInput style={styles.textInput} placeholder="Phone Number" value={phoneNum} onChangeText={(text) => setPhoneNum(text)} autoCapitalize="none"/>
                        <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} autoCapitalize="none"/>
                    </Animated.View>
                    <TouchableOpacity onPress={() => updateSequence()}> 
                        <Text style={styles.btnStyle}>Next</Text> 
                    </TouchableOpacity>
                </Animated.View>
        loadAnimation();        
    }
    //2nd Screen - Social Data - Profile Picture, and Display Name
    else if (sequence == 1) {
        display = <Animated.View style={[styles.inputContainer, {opacity: fadeAnim,}]}>
                    <ImageSelector photoUri={photoUri} setPhoto={setPhotoUri} />
                    <Animated.View style={{width: inputSlide}}> 
                        <TextInput style={styles.textInput} placeholder="Name" value={name} onChangeText={(text) => setName(text)} /> 
                    </Animated.View>
                    <TouchableOpacity onPress={() => updateSequence()}> 
                        <Text style={styles.btnStyle}>Next</Text>
                    </TouchableOpacity>
                </Animated.View>
        loadAnimation();
    }
    //3rd Screen - Fitness Data - Weight, Height, Goal (Distance to reach each weekend)
    else {

        display = <Animated.View style={[styles.inputContainer, {opacity: fadeAnim,}]}>
                    <Animated.View style={{width: inputSlide}}>
                        <TextInput style={styles.textInput} placeholder="Weight (lbs)" value={weight} onChangeText={(text) => setWeight(text)} keyboardType="numeric"/>
                        <TextInput style={styles.textInput} placeholder="Height (cm)" value={height} onChangeText={(text) => setHeight(text)} keyboardType="numeric"/>
                        <TextInput style={styles.textInput} placeholder="Goal" value={goal} onChangeText={(text) => setGoal(text)} />
                    </Animated.View>
                    <TouchableOpacity  onPress={() => {updateData()}}>
                        <Text style={styles.btnStyle}>Finish</Text>
                    </TouchableOpacity>
                </Animated.View>
        loadAnimation();
    }

    return <View style={styles.container}>
        <Animated.View style={{height: 5, backgroundColor: '#65418F', width: slideAnim}}/>
        {display}
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    textInput: {
        borderBottomColor: "#00b4cf",
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 25,
        marginHorizontal: 10,
        marginVertical: 15,
    },
    btnStyle: {
        fontSize: 20,
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#65418F',
        padding: 10,
        paddingLeft: 55,
        paddingRight: 55,
        marginTop: 50,
    },
})

export default UpdateProfile;