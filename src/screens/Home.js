import React, {useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const Home = (props) => {
    const [userData, setUserData] = useState(props.navigation.getParam('userData'));

    const fetchData = async () => {
        let users = await DataStore.query(User);
        console.log(users);
      }

    return <View style={styles.container}>
        <Text style={{fontSize: 30}}>Welcome to the Home Page</Text>
    <   Text>{userData.email}</Text>
        <Text>{userData.password}</Text>
        <Text>{userData.photoUrl}</Text>
        <Text>{userData.name}</Text>
        <Text>{userData.height}</Text>
        <Text>{userData.weight}</Text>
        <Button title="Fetch Data" onPress={() => {fetchData()}} />
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"  
    },
});

export default Home;