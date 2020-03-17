import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Google from 'expo-google-app-auth';

const GoogleBtn = () => {

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