import React, { useState } from 'react';
import {View, TextInput, StyleSheet, ScrollView, Button, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SignUp = (props) => {
    let [sequence, setSequence] = useState(props.navigation.getParam('sequence'));

    let [email, setEmail] = useState(props.navigation.getParam('email'));
    let [phoneNum, setPhoneNum] = useState("");
    let [password, setPassword] = useState("");
    let [photoUri, setPhotoUri] = useState(props.navigation.getParam('photoUrl'));
    let [name, setName] = useState(props.navigation.getParam('name'));
    let [weight, setWeight] = useState("");
    let [height, setHeight] = useState("");
    let [goal, setGoal] = useState("");

    let display;

    let updateSequence = () => {
        let temp = sequence + 1;
        setSequence(temp);
    }

    if (sequence == 0) {
        display = (
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.textInput} placeholder="Phone Number" value={phoneNum} onChangeText={(text) => setPhoneNum(text)} />
                <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
                <Button title="Next" onPress={() => updateSequence()}/>
            </View>
        )    
    }
    else if (sequence == 1) {
        display = (
            <View style={styles.inputContainer}>
                <TouchableOpacity>
                    <Image style={{width: 200, height: 200}} source={{uri: photoUri}}/>
                </TouchableOpacity>
                <TextInput style={styles.textInput} placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
                <Button title="Next" onPress={() => updateSequence()}/>
            </View>
        )
    }
    else {
        display = (
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Weight" value={weight} onChangeText={(text) => setWeight(text)} />
                <TextInput style={styles.textInput} placeholder="Height" value={height} onChangeText={(text) => setHeight(text)} />
                <TextInput style={styles.textInput} placeholder="Goal" value={goal} onChangeText={(text) => setGoal(text)} />
                <Button title="Finish" onPress={() => {
                    alert(`Thanks for Signing In \n Email: ${email}\n Phone Number: ${phoneNum}\n Password: ${password}\n Photo URI: ${photoUri}\n Name: ${name}\n Weight: ${weight}\n Height: ${height}\n Goal: ${goal} `)}}
                />
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