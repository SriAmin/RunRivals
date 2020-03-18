import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Google from 'expo-google-app-auth';

const GoogleBtn = (props) => {

    //iOS - 737913280141-ri24odrhv8afpam0psr6qnhub1uoopd5.apps.googleusercontent.com
    //Android- 737913280141-4pcmk2t56rllgrdqfmninh5t6blfljh9.apps.googleusercontent.com

    //Using Google API Credentials, we can log in and obtain user data
    async function signInWithGoogleAsync() {
        try {
            //Performs the request to sign in
            const result = await Google.logInAsync({
                expoClientId: "737913280141-ha4lp7pabipqb1prqeneap6mso7fqrda.apps.googleusercontent.comgit c",
                iosClientId: "737913280141-ri24odrhv8afpam0psr6qnhub1uoopd5.apps.googleusercontent.com",
                androidClientId: "737913280141-4pcmk2t56rllgrdqfmninh5t6blfljh9.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });
            console.log(result)
            //If login was successfull, it'll display user information and display profile picture
            if (result.type == "success"){
                const user = result.user
                alert(`Logged In! \n Hello ${user.name}\n Email: ${user.email}`)
                props.urlSetter(user.photoUrl);
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
        <TouchableOpacity onPress={signInWithGoogleAsync}>
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
    googleButton: {
        padding: 15,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10,
    }
})

export default GoogleBtn;