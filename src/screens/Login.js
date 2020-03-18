import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native'
import FacebookBtn from '../components/FacebookBtn'
import GoogleBtn from '../components/GoogleBtn'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Login = () => {
    //State used for profile image obtained from social authentication (Google, Facebook)
    let [url, setURL] = useState("#");

    //Represents the main login page with text fields and buttons for social authentication
    return <View style={styles.pageContainer}>
            <View style={styles.inputContainer}>
                <Image style={styles.imageStyle} source={require('../../assets/icon.png')}/>
                <Text style={{textAlign: 'center'}}></Text>
                <TextInput style={styles.textInput} placeholder="Email"/>
                <TextInput style={styles.textInput} placeholder="Password"/>
                <TouchableOpacity onPress={() => {alert("Log In Pressed")}} style={styles.logInBtn}>
                    <Text style={{color: "white", fontSize: 18,}}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.signUp}>No Account? <Text style={{color: '#65418F'}} onPress={() => {alert("Sign Up Button Pressed")}}>Sign Up </Text> </Text>
                <Image style={styles.imageStyle} source={{uri: url}} />
            </View>
            <View style={styles.socialContainer}>
                <GoogleBtn urlSetter={setURL}/>
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
        marginBottom: 50,
        flexDirection: "row",
    },
})

export default Login;