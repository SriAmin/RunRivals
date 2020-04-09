import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, Image } from 'react-native';
import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

const Home = ( { navigation} ) => {
    const [userData, setUserData] = useState(navigation.getParam('userData'));

    //Will fetch and log the data inside DataStore
    const fetchData = async () => {
        let users = await DataStore.query(User);
        // console.log(users);
        console.log(userData);
    }

    //Used for debugging, it'll delete the user in DataStore
    const deleteUser = async ({navigation}) => {
      await DataStore.delete(User, c => c.email("eq", userData.email));
    }

    return <View style={styles.container}>
        <Text style={{fontSize: 30}}>Welcome to the Home Page</Text>
        <Text style = {styles.rankLabel}>Rank: </Text>
        <Text style = {styles.rank}>0/60</Text>
        <Button style = {styles.leaderboardButton} title="LeaderBoard"/>
        <Text style = {styles.averageSpeedLabel}>Average Speed: </Text>
        <Text>km/h</Text>
        <View style={styles.progressBar}></View>
        <Text>Distance Achieved: 0 km</Text>
        <Text>{userData.email}</Text>
        <Text>{userData.password}</Text>
        <Image styles = {styles.profilePicture} />
        <Text>{userData.name}</Text>
        <Text>{userData.height}</Text>
        <Text>{userData.weight}</Text>
        <Button title="Fetch Data" onPress={() => {fetchData()}} />
        <Button title="Delete User" onPress={() => {deleteUser()}} />
    </View>
}

const styles = StyleSheet.create({
    container: {
      justifyContent:'center',
      alignItems: 'stretch'
    },
    profilePicture: {
      height: 100,
      width: 100
    },
    rankLabel: {
      fontSize: 30,
      fontWeight: 'bold',
      marginVertical: 10.
    },
    rank: {
      fontSize: 25,
    },
    leaderboardButton: {
      width: 15
    },
    averageSpeedLabel: {
      fontSize: 25,
      fontWeight:'bold'
    },
    progressBar: {
      height: 20,
      width: '100%',
      backgroundColor: 'white',
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 5
    }
});

export default Home;