import React, {useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet, Image} from 'react-native'
import FacebookBtn from '../components/FacebookBtn'
import GoogleBtn from '../components/GoogleBtn'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const Login = (props) => {
    let debug = false;
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let user = {}

    //Navigates to home page and authenticates user
    let transitionHome = async () => {
        //Grabs user and check with email and password exist
        let users = await DataStore.query(User);
        let pass = false;
        users.forEach(element => {
            if (email === element.email && password == element.password) {
                user["email"] = element.email
                user["password"] = element.password
                user["photoUrl"] = element.photoUrl
                user["name"] = element.name
                user["height"] = element.height
                user["weight"] = element.weight
                user["distance"] = element.distance
                pass = true;
            }
        });
        //If passed, it'll navigate or just alert the user of authentication failure
        if (pass) {
            console.log(user)
            props.navigation.navigate('Home Page', {userData: user});
        }
        else {
            alert("Log In Failed, Look Into Email and Password")
        }
    }

    //Navigates to Sign Up page
    let transitionSignUp = () => {
        if (debug) { alert("Sign Up Button Pressed"); }
        props.navigation.navigate('Sign Up', {sequence: 0, photoUrl: "https://getdrawings.com/free-icon/react-icon-69.png", email: "", name: ""});
    }

    //Represents the main login page with text fields and buttons for social authentication
    return <ScrollView style={styles.pageContainer} centerContent={true}>
            <View style={styles.inputContainer}>
                <Image style={styles.imageStyle} source={require('../../assets/icon.png')}/>
                <Text style={{textAlign: 'center'}}></Text>
                <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} autoCapitalize="none" />
                <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} autoCapitalize="none"/>
                <TouchableOpacity onPress={transitionHome} style={styles.logInBtn}>
                    <Text style={{color: "white", fontSize: 18,}}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.signUp}>No Account? <Text style={{color: '#65418F'}} onPress={transitionSignUp}>Sign Up </Text> </Text>
            </View>
            <View style={styles.socialContainer}>
                <GoogleBtn debug = {true} navigate={props.navigation.navigate}/>
                <FacebookBtn debug = {true} navigate={props.navigation.navigate}/>
            </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    inputContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    textInput: {
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginHorizontal: 15,
        marginVertical: 10,
        width: 325
    },
    logInBtn: {
        marginTop: 25,
        backgroundColor: "#65418F",
        padding: 12.5,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#d1d1d1',
    },
    signUp: {
        marginTop: 25,
        fontSize: 18,
        textAlign: 'center',
    },
    imageStyle: {
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    socialContainer: {
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
    },
})

export default Login;