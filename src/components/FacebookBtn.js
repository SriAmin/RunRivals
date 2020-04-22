import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Facebook from 'expo-facebook';

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const FB_APP_ID = '712634022836325';


const FacebookBtn = (props) => {

    //Main function for authentication through facebook
    //Doesn't not work on browsers currently
    async function logIn() {
        //Will intialize facebook login API and ask for permissions
        try {
          await Facebook.initializeAsync('712634022836325');
          const {
            type,
            token
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email', 'user_friends'],
          });

          //If login was successfull, it'll set data obtained from account
          if (type === 'success') {
            // Get the user data from Facebook Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`);

            //Alert and display that JSON data
            const json = await response.json();
            console.log(json);
            if (props.debug) { alert(`Logged In! \nHello ${json.name}\n Email: ${json.email}`); }
            
             //This will grab the data and check if email already exist
             let userData = {} 
             let users = await DataStore.query(User);
             let doesExist = false;
             users.forEach(element => {
                 if (json.email == element.email) {
                    userData["email"] = element.email
                    userData["password"] = element.password
                    userData["photoUrl"] = element.photoUrl
                    userData["name"] = element.name
                    userData["height"] = element.height
                    userData["weight"] = element.weight
                    userData["distance"] = element.distance
                    doesExist = true
                 }
             });

             //Allows user to login if that email exist in DataStore
             if (doesExist) {
                props.navigate('Home Page', {userData: userData});
             }
             //Else, guide user through sign up process
             else {
                props.navigate('Sign Up', {sequence: 0, photoUrl: json.picture.data.url, email: json.email, name: json.name});
              }
          }
          //If login failed, it'll simple display a failure message 
          else {
            alert("Abandoned Login!")
          }
        } 
        //If an error occurs, it'll display this message
        catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    //The button allowing user to sign in through facebook
    return <View>
        <TouchableOpacity onPress={logIn} style={styles.btn}>
            <Image source={require("../../assets/facebookIcon.png")} />
            <Text style={styles.fBookButton}>Log In with Facebook</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
      btn: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#3b5998',
        alignContent: 'center',
        borderWidth: 1,
        marginHorizontal: 5,
      },
      fBookButton: {
          color: 'white',
          padding: 5,
          fontSize: 14,
          textAlign: 'center',
      }
})

export default FacebookBtn;