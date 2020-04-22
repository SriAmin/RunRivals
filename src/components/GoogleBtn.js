import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import * as Google from 'expo-google-app-auth';

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const GoogleBtn = (props) => {

    //iOS - 737913280141-ri24odrhv8afpam0psr6qnhub1uoopd5.apps.googleusercontent.com
    //Android- 737913280141-4pcmk2t56rllgrdqfmninh5t6blfljh9.apps.googleusercontent.com

    //Using Google API Credentials, we can log in and obtain user data
    async function signInWithGoogleAsync() {
        try {
            //Performs the request to sign in
            const result = await Google.logInAsync({
                expoClientId: "737913280141-ha4lp7pabipqb1prqeneap6mso7fqrda.apps.googleusercontent.com",
                iosClientId: "737913280141-ri24odrhv8afpam0psr6qnhub1uoopd5.apps.googleusercontent.com",
                androidClientId: "737913280141-4pcmk2t56rllgrdqfmninh5t6blfljh9.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });
            console.log(result)
            //If login was successfull, it'll display user information and display profile picture
            if (result.type == "success"){
                const user = result.user
                if (props.debug) { alert(`Logged In! \n Hello ${user.name}\n Email: ${user.email}`) }

                 //This will grab the data and check if email already exist
                let userData = {} 
                let users = await DataStore.query(User);
                let doesExist = false;
                users.forEach(element => {
                    if (user.email == element.email) {
                        userData["email"] = element.email
                        userData["password"] = element.password
                        userData["photoUrl"] = element.photoUrl
                        userData["name"] = element.name
                        userData["height"] = element.height
                        userData["weight"] = element.weight
                        userData["distance"] = element.height
                        doesExist = true
                    }
                });
                //If email exist, it'll transfer user to HomePage
                if (doesExist) {
                    props.navigate('Home Page', {userData: userData});
                }
                //If not, it'll guide the user to the Sign Up Process
                else {
                    props.navigate('Sign Up', {sequence: 0, photoUrl: user.photoUrl, email: user.email, name: user.name});
                }
                return result.accessToken;
            }
            //If user failed to log in 
            else {
                alert("Abonded Login");
            }
        }
        //Catch any crash worthy error throughout the process 
        catch (e) {
            alert(`Google Login Failure: ${e}`)
        }
    }

    //Displays the Google Sign in Button
    return <View>
        <TouchableOpacity onPress={signInWithGoogleAsync} style={styles.btn}>
            <Image style={styles.imageBtn} source={require('../../assets/googleIcon.png')}/>
            <Text style={styles.googleButton}>
                <Text style={{color: "#4285F4"}}>Sign </Text> 
                <Text style={{color: "#DB4437"}}>in </Text> 
                <Text style={{color: "#F4B400"}}>with </Text>
                <Text style={{color: "#0F9D58"}}>Google</Text>
            </Text>
        </TouchableOpacity>
    </View>

}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        flexDirection: 'row',
        alignContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    imageBtn: {
    },
    googleButton: {
        fontSize: 15,
        padding: 5,
        fontWeight: '600',
        textAlign: 'center',
    }
})

export default GoogleBtn;