import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native'
import { AuthSession } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Facebook from 'expo-facebook';

const FB_APP_ID = '712634022836325';

const Login = () => {

    const [result, setResult] = useState(null);

    async function logIn() {
        try {
          await Facebook.initializeAsync('712634022836325');
          const {
            type,
            token
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email', 'user_friends'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

            const json = await response.json();
            console.log(json);
            alert(`Logged In, Hello ${json.name}`);
          } else {
            alert("Abandoned Login!")
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    return <View style={styles.pageContainer}>
            <View style={styles.inputContainer}>
                <Text style={{textAlign: 'center'}}></Text>
                <TextInput style={styles.textInput}/>
                <TextInput style={styles.textInput}/>
                <Button title="Log In"/>
                <Text style={styles.signUp}>No Account? <Text style={{color: 'blue'}} onPress={() => {alert("Sign Up Button Pressed")}}>Sign Up </Text> </Text>
            </View>
            <View style={styles.socialContainer}>
                <TouchableOpacity onPress={logIn}>
                    <Text style={styles.fBookButton}>Log In Through Facebook</Text>
                </TouchableOpacity>
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
    socialContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 50,
    },
    fBookButton: {
        padding: 15,
        backgroundColor: '#3b5998',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        alignContent: 'center',
        borderRadius: 10,
    }
})

export default Login;