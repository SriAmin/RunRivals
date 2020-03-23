import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Button} from 'react-native';

const SignUp = () => {
    let [sequence, setSequence] = useState(0);
    let display;
    if (sequence == 0) {
        display = (
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Email"/>
                <TextInput style={styles.textInput} placeholder="Phone Number"/>
                <TextInput style={styles.textInput} placeholder="Password"/>
                <Button title="Next" onPress={() => setSequence(sequence++)}/>
            </View>
        )    
    }
    else if (sequence == 1) {
        display = (
            <View>
                <Text>Sequence 2</Text>
                <Button title="Next" onPress={() => setSequence(sequence++)}/>
            </View>
        )
    }
    else {
        display = (
            <View>
                <Text>Sequence 3</Text>
                <Button title="Next" onPress={() => {alert("Hello")}}/>
            </View>
        )
    }

    return <ScrollView style={styles.container}>
        {display}
    </ScrollView>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: "center",
    },
    textInput: {
        borderBottomWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginHorizontal: 10,
        marginVertical: 15,
        width: 325
    },
});

export default SignUp;