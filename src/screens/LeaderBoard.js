import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import UserDetail from '../components/UserDetail'

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const LeaderBoard = (props) => {
    const userEmail = props.navigation.getParam('email');

    let users = []; 
    let displayInfo = [];
    let isUser = false
    useEffect (() => {
        fetchData();
    })

    const fetchData = async () => { 
        users = await DataStore.query(User); 
        console.log(userEmail)
        users.forEach(element => {
            if (element.email == userEmail) { isUser = true }
            else { isUser = false }

            displayInfo.push({
                id: element.id,
                name : element.name,
                photoUrl : element.photoUrl,
                height : element.height,
                weight : element.weight,
                distance : element.distance,
                isUser : isUser
            })
        });
    }
    let count = 1;
    return <View style={styles.container}>
        <FlatList 
            data={displayInfo}
            keyExtractor={item => item.id}
            renderItem={({item}) => <UserDetail data={item} rank={count++}/>}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default LeaderBoard;