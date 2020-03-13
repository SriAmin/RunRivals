import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

const Login = () => {
    return <View style={styles.container}>
        <Text>Run Rivals</Text>
        <TextInput style={styles.textInput}/>
        <TextInput style={styles.textInput}/>
    </View>
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 3,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default Login;