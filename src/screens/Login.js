import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native'
import FacebookBtn from '../components/FacebookBtn'

const Login = () => {
    //State used for profile image obtained from social authentication (Google, Facebook)
    let [url, setURL] = useState("");

    //Represents the main login page with text fields and buttons for social authentication
    return <View style={styles.pageContainer}>
            <View style={styles.inputContainer}>
                <Text style={{textAlign: 'center'}}></Text>
                <TextInput style={styles.textInput}/>
                <TextInput style={styles.textInput}/>
                <Button title="Log In"/>
                <Text style={styles.signUp}>No Account? <Text style={{color: 'blue'}} onPress={() => {alert("Sign Up Button Pressed")}}>Sign Up </Text> </Text>
            </View>
            <View style={styles.socialContainer}>
                <Image style={styles.imageStyle} source={{uri: url}} />
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
    socialContainer: {
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 50,
    },
    imageStyle: {
      width: 100,
      height: 100,
      marginBottom: 15,
    },
})

export default Login;