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
        <View style={{width: 200, alignItems: "stretch"}}>
        <Button style = {styles.leaderboardButton} title="Leader Board"/>
        </View>
        <Text style = {styles.averageSpeedLabel}>Average Speed: </Text>
        <Text style={styles.averageSpeed}>km/h</Text>
        <View style={styles.progressBar}></View>
        <Text style={styles.distanceLabel}>Distance Achieved: 0 km</Text>
        <Text>{userData.email}</Text>
        <Image styles = {styles.profilePicture} />
        <Text>{userData.name}</Text>
        <Button title="Fetch Data" onPress={() => {fetchData()}} />
        <Button title="Delete User" onPress={() => {deleteUser()}} />
    </View>
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    profilePicture: {
      height: 100,
      width: 100
    },
    rankLabel: {
      fontSize: 45,
      fontWeight: 'bold',
      marginTop: 70
    },
    rank: {
      fontSize: 35,
      marginTop: 30,
      marginBottom: 50
    },
    leaderboardButton: {
      width: 100,
      padding: 12.5,
      paddingLeft: 100,
      paddingRight: 50,
      borderRadius: 10,
      borderWidth: 2,
      marginBottom:100,
      textAlign:'justify'
    },
    averageSpeedLabel: {
      fontSize: 35,
      width: '65.25%',
      fontWeight:'bold',
      marginTop: 100,
      marginBottom: 30
    },
    averageSpeed: {
      fontSize: 25,
      marginHorizontal: 50,
      marginBottom: 30
      
    },
    progressBar: {
      height: 20,
      width: '90%',
      alignSelf:'center',
      backgroundColor: 'white',
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 20
    },
    distanceLabel: {
      fontSize: 20,
      marginVertical: 30
    }
});

export default Home;