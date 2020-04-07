import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const LeaderBoard = () => {
    let users = []; 
    let displayInfo = [];
    useEffect (() => {
        fetchData();
    })

    const fetchData = async () => { 
        users = await DataStore.query(User); 
        console.log(users)
        users.forEach(element => {
            displayInfo.push({
                name : element.name
            })
        });
    }

    return <View style={styles.container}>
        <Text>Welcome to LeaderBoard</Text>
        <FlatList 
            data={displayInfo}
            renderItem={({item}) => <Text>{item.name}</Text>}
        />
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