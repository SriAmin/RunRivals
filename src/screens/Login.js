import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native'
import FacebookBtn from '../components/FacebookBtn'
import GoogleBtn from '../components/GoogleBtn'
import * as Google from 'expo-google-app-auth';

//iOS - 737913280141-ri24odrhv8afpam0psr6qnhub1uoopd5.apps.googleusercontent.com
//Android- 737913280141-4pcmk2t56rllgrdqfmninh5t6blfljh9.apps.googleusercontent.com

const Login = () => {
    //State used for profile image obtained from social authentication (Google, Facebook)
    let [url, setURL] = useState("#");

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                iosClientId: "737913280141-ri24odrhv8afpam0psr6qnhub1uoopd5.apps.googleusercontent.com",
                androidClientId: "737913280141-4pcmk2t56rllgrdqfmninh5t6blfljh9.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });
            console.log(result)
            if (result.type == "success"){
                //console.log(result);
                return result.accessToken;
            } 
            else {
                alert("Abonded Login");
            }
        } catch (e) {
            alert(e)
        }
    }

    //Represents the main login page with text fields and buttons for social authentication
    return <View style={styles.pageContainer}>
            <View style={styles.inputContainer}>
                <Text style={{textAlign: 'center'}}></Text>
                <TextInput style={styles.textInput}/>
                <TextInput style={styles.textInput}/>
                <Button title="Log In"/>
                <Text style={styles.signUp}>No Account? <Text style={{color: 'blue'}} onPress={() => {alert("Sign Up Button Pressed")}}>Sign Up </Text> </Text>
                <Image style={styles.imageStyle} source={{uri: url}} />
            </View>
            <View style={styles.socialContainer}>
                <GoogleBtn />
                <FacebookBtn urlSetter={setURL}/>
            </View>
    </View>
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    inputContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 3,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        width: 300
    },
    signUp: {
        marginTop: 25,
        fontSize: 18,
        textAlign: 'center',
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginBottom: 15,
      },
    socialContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 50,
        flexDirection: "row",
    },
})

export default Login;