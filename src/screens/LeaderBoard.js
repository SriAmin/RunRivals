import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native'

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const LeaderBoard = () => {
    let users = []; 

    useEffect (() => {
        fetchData();
    })

    const fetchData = async () => { 
        users = await DataStore.query(User); 
        console.log(users)
    }

    return <View style={styles.container}>
        <Text>Welcome to LeaderBoard</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LeaderBoard;