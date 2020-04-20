import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import UserDetail from '../components/UserDetail'

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const LeaderBoard = (props) => {

    //TODO: Perform Sorting based on distance to properly rank users

    const userEmail = props.navigation.getParam('email');
    let users = []; 
    let displayInfo = [];
    let isUser = false
    
    //Will execute once the screen renders
    useEffect (() => {
        fetchData();
    })

    //Fetch the user data and apply it to a new array for the FlatList
    const fetchData = async () => { 
        users = await DataStore.query(User); 
        console.log(userEmail)
        //Go through each object and take the value needed to display
        users.forEach(element => {
            if (element.email == userEmail) { isUser = true }
            else { isUser = false }

            displayInfo.push({
                id: element.id,
                email : element.email,
                name : element.name,
                photoUrl : element.photoUrl,
                height : element.height,
                weight : element.weight,
                distance : element.distance,
                isUser : isUser
            })
        });

        //Sorts the array based on the distance
        displayInfo.sort(function(a,b) {
            return b.distance - a.distance
        })
    }

    //This will be sent to display the rank of the user
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