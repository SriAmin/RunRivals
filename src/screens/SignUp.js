import React, { useState, useEffect } from 'react';
import {View, TextInput, StyleSheet, ScrollView, Button, Dimensions, Animated} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    let [progress, setProgress] = useState(0);
    //Setting state variable for animating opacity
    let [fadeAnim, setFade] = useState(new Animated.Value(0))
    let fadeIn = Animated.timing ( fadeAnim, {toValue: 1, duration: 1000,});

    //Will trigger fade in animation when screen is loaded in
    React.useEffect(() => {
        fadeIn.start();
    }, [])

    //Called to change the sequeunce and display different inputs
    let updateSequence = () => {
        let temp = sequence + 1;
        setFade(new Animated.Value(0));
        setSequence(temp);
    }

    //1st Screen - Basic Authentication - Email, Phone Number, Password
    if (sequence == 0) {
        display = (
            <View style={styles.inputContainer}>
                <Animated.View
                    style={{
                        ...props.style,
                        opacity: fadeAnim,
                    }}
                >
                    <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.textInput} placeholder="Phone Number" value={phoneNum} onChangeText={(text) => setPhoneNum(text)} />
                    <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                    <Button title="Next" onPress={() => updateSequence()}/>
                </Animated.View>
            </View>
        )    
    }
    //2nd Screen - Social Data - Profile Picture, and Display Name
    else if (sequence == 1) {
        display = (
            <View style={styles.inputContainer}>
                <TouchableOpacity>
                        <Animated.Image style={styles.imageStyle} source={{uri: photoUri}}/>
                </TouchableOpacity>
                <Animated.View
                    style={{
                        ...props.style,
                        opacity: fadeAnim,
                        justifyContent: 'center',
                    }}
                >
                    <TextInput style={styles.textInput} placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
                    <Button title="Next" onPress={() => updateSequence()}/>
                </Animated.View>
            </View>
        )

        fadeIn.start();
    }
    //3rd Screen - Fitness Data - Weight, Height, Goal (Distance to reach each weekend)
    else {

        display = (
            <View style={styles.inputContainer}>
                <Animated.View
                    style={{
                        ...props.style,
                        opacity: fadeAnim,
                        justifyContent: 'center',
                    }}
                >
                    <TextInput style={styles.textInput} placeholder="Weight" value={weight} onChangeText={(text) => setWeight(text)} />
                    <TextInput style={styles.textInput} placeholder="Height" value={height} onChangeText={(text) => setHeight(text)} />
                    <TextInput style={styles.textInput} placeholder="Goal" value={goal} onChangeText={(text) => setGoal(text)} />
                    <Button title="Finish" onPress={() => {
                        alert(`Thanks for Signing In \n Email: ${email}\n Phone Number: ${phoneNum}\n Password: ${password}\n Photo URI: ${photoUri}\n Name: ${name}\n Weight: ${weight}\n Height: ${height}\n Goal: ${goal} `)}}
                    />
                </Animated.View>
            </View>
        )

        fadeIn.start();
    }

    return <ScrollView style={styles.container}>
        <View style={{height: 5, backgroundColor: '#65418F', width: Dimensions.get('window').width / (3 - sequence)}}/>
        {display}
    </ScrollView>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        alignItems: "center",
        marginTop: 100,
    },
    imageStyle: {
        width: 200, 
        height: 200, 
        borderWidth: 1, 
        borderRadius: 50,
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
});

export default SignUp;