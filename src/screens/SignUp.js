import React, { useState } from 'react';
import {View, TextInput, StyleSheet, ScrollView, Button, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SignUp = (props) => {
    let [sequence, setSequence] = useState(props.navigation.getParam('sequence'));
    let display;

    let updateSequence = () => {
        let temp = sequence + 1;
        setSequence(temp);
    }

    if (sequence == 0) {
        display = (
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Email"/>
                <TextInput style={styles.textInput} placeholder="Phone Number"/>
                <TextInput style={styles.textInput} placeholder="Password"/>
                <Button title="Next" onPress={() => updateSequence()}/>
            </View>
        )    
    }
    else if (sequence == 1) {
        let photoUri = props.navigation.getParam('photoUrl')
        
        display = (
            <View style={styles.inputContainer}>
                <TouchableOpacity>
                    <Image style={{width: 200, height: 200}} source={{uri: photoUri}}/>
                </TouchableOpacity>
                <TextInput style={styles.textInput} placeholder="Name"/>
                <Button title="Next" onPress={() => updateSequence()}/>
            </View>
        )
    }
    else {
        display = (
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Weight"/>
                <TextInput style={styles.textInput} placeholder="Height"/>
                <TextInput style={styles.textInput} placeholder="Goal"/>
                <Button title="Finish" onPress={() => {alert("Hello")}}/>
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