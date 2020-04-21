import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { TouchableOpacity } from 'react-native-gesture-handler'


import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";

import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const Home = (props) => {
    const [userData, setUserData] = useState(props.navigation.getParam('userData'));

    //Will fetch and log the data inside DataStore
    const fetchData = async () => {
        let users = await DataStore.query(User);
        console.log(users);
    }

    //Used for debugging, it'll delete the user in DataStore
    const deleteUser = async () => {
      await DataStore.delete(User, c => c.email("eq", userData.email));
    }

    return <View style={styles.container}>
        <Text style={{fontSize: 30}}>Welcome to the Home Page</Text>
        <Text>{userData.email}</Text>
        <Text>{userData.password}</Text>
        <TouchableOpacity onPress={() => {props.navigation.navigate("Profile", {userData: userData, isUser: true})}}>
          <Image style={{width: 100, height: 100}} source={{uri : userData.photoUrl}} />
        </TouchableOpacity>
        <Text>{userData.name}</Text>
        <Text>{userData.height}</Text>
        <Text>{userData.weight}</Text>
        <Text>{userData.distance}</Text>
        <Button title="LeaderBoard" onPress={() => {props.navigation.navigate("Leaderboard", {email: userData.email})}}/>
        <Button title="Fetch Data" onPress={() => {fetchData()}} />
        <Button title="Delete User" onPress={() => {deleteUser()}} />
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"  
    },
    imageStyle: {
      width: 200, 
      height: 200, 
      borderWidth: 1, 
      borderRadius: 50,
      marginVertical: 25,
  },
});

export default Home;