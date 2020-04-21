import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Amplify from '@aws-amplify/core';
import {DataStore, Predicates } from '@aws-amplify/datastore';
import { User } from "../models";

import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const UserDetail = (props) => {

    //Used the determine if the styling is changed based of the user being shown
    let viewStyle = () => {
        //If the data is the user logged in currently
        if (props.data.isUser) {
            return {
                flex: 1,
                borderWidth: 1,
                flexDirection: "row",
                borderColor: "#00b4cf",
                borderRadius: 5,
                backgroundColor: "#cdf2f7"
            }
        }
        //Another person on the DataStore
        else {
            return {
                flex: 1,
                borderWidth: 1,
                flexDirection: "row",
                borderColor: "#00b4cf",
                borderRadius: 5,
            }
        }
    }

    //Mainly for debugging, it'll display all the emails on the leaderboard
    useEffect(() => {
        console.log(props.data.email)
    }, [])

    //Navigate to the Profile page with the user data selected
    const navigateProfile = async () => {
        //Queries the user based on email
        let user = await DataStore.query(User, e => e.email("eq", props.data.email))
        user = user[0]

        //Creates an object to pass onto the profile page
        let data = {
            email: user.email,
            password: user.password,
            photoUrl: user.photoUrl,
            name: user.name,
            height: user.height,
            weight: user.weight
        }
        console.log(data)
        props.navigate("Profile", {userData: data, isUser: false})
    }

    return <TouchableOpacity style={viewStyle()} onPress={() => {navigateProfile()}}>
        <View style={styles.rankContainer}>
            <Text style={[styles.textStyle, {fontSize: 25, borderBottomWidth: 2, borderColor: "black"}]}># {props.rank}</Text>
            <View style={styles.spacing}/>
            <Text style={[styles.textStyle, {fontSize: 18}]}>{props.data.distance} m</Text>
        </View>
        <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={{uri: props.data.photoUrl}}/>
            <Text style={styles.username}>{props.data.name}</Text>
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.textStyle}>{props.data.weight} lbs</Text>
            <Text style={styles.textStyle}>{props.data.height} cm</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        flexDirection: "row",
        borderRadius: 5,
    },
    rankContainer: {
        marginLeft: 15,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        flex: 3,
        marginLeft: 15,
        marginVertical: 15,
        alignItems: "center",
    },
    bodyContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    spacing: {
        height: 1, 
        width: 50, 
        backgroundColor: "black",
        marginVertical: 5,
    },
    imageStyle: {
        width: 100, 
        height: 100,
        borderWidth: 1, 
        borderRadius: 25,
    },
    username: {
        fontSize: 18,
        marginTop: 5,
    },
    textStyle: {
        color: "#65418F",
        fontSize: 16,
        fontWeight: "500",
    }
})

export default UserDetail;