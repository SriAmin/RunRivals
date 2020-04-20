import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const Profile = (props) => {
    const [userData, setUserData] = useState(props.navigation.getParam('userData'));

    let userObject;

    useEffect(() => {
        console.log(userData);
    }, [])

    // const fetchProfile = async () => {
    //     const user = await DataStore.query(User, e => e.email("eq", userEmail));
    //     userObject = user[0]
    //     console.log(userObject)
        
    // };

    return <View style={styles.container}>
        <View style={styles.main}>
            <Image style={styles.imageStyle} source={{uri : userData.photoUrl}} />
            <Text style={{fontSize: 25, marginTop: 15, color: "#65418F", fontWeight:"500"}}>{userData.name}</Text>
        </View>
        <View style={styles.secondary}>
            <View>
                <Text style={styles.infoText}>Email:</Text>
                <Text style={styles.infoText}>Password:</Text>
                <Text style={styles.infoText}>Height:</Text>
                <Text style={styles.infoText}>Weight:</Text>
            </View>
            <View>
                <Text style={styles.infoText}>{userData.email}</Text>
                <Text style={styles.infoText}>{userData.password}</Text>
                <Text style={styles.infoText}>{userData.height} cm</Text>
                <Text style={styles.infoText}>{userData.weight} lbs</Text>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    secondary: {
        borderTopWidth: 2,
        flex: 3,
        alignItems: "flex-start",
        flexDirection: "row"
    },
    imageStyle: {
        width: 125,
        height: 125,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#65418F"
    },
    infoText: {
        fontSize: 20,
        padding: 15,
        fontWeight: "300",
    }
});

export default Profile;