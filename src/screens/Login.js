import React, {useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet, Image} from 'react-native'
import FacebookBtn from '../components/FacebookBtn'
import GoogleBtn from '../components/GoogleBtn'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Login = (props) => {
    let debug = false;
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    //State used for profile image obtained from social authentication (Google, Facebook)
    let [url, setURL] = useState("#");

    //Navigates to home page
    let transitionHome = () => {
        if (debug) { alert(`Login Pressed \n Email: ${email}\n Password: ${password}`) }
        props.navigation.navigate('Home Page');
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
                <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)}/>
                <TouchableOpacity onPress={transitionHome} style={styles.logInBtn}>
                    <Text style={{color: "white", fontSize: 18,}}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.signUp}>No Account? <Text style={{color: '#65418F'}} onPress={transitionSignUp}>Sign Up </Text> </Text>
            </View>
            <View style={styles.socialContainer}>
                <GoogleBtn urlSetter={setURL} debug = {true} navigate={props.navigation.navigate}/>
                <FacebookBtn urlSetter={setURL} debug = {true} navigate={props.navigation.navigate}/>
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
        flexDirection: "row",
        marginVertical: 50,
    },
})

export default Login;