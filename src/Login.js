import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
import { AuthSession } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FB_APP_ID = '712634022836325';

const Login = () => {

    const [result, setResult] = useState(null);
    const handleRequest = async () => {
        let redirectUrl = AuthSession.getRedirectUrl(); 
            let result = await AuthSession.startAsync(
            {
                    authUrl:
                    `https://www.facebook.com/v2.8/dialog/oauth?response_type=token`  +
                    `&client_id=${FB_APP_ID}` +
                    `&redirect_uri=${
                    encodeURIComponent(
                    redirectUrl
                ) }`,
            }
        );
        setResult(result);
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
                <TouchableOpacity onPress={handleRequest}>
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