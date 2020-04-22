import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Button, Image, Animated } from 'react-native';
import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { User } from "../models";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

}

const Home = ( { navigation} ) => {
    const [userData, setUserData] = useState(navigation.getParam('userData'));
    let animation = useRef(new Animated.Value(0));
    const [progress, setProgress] = useState(0);
 

    //Will fetch and log the data inside DataStore
    const fetchData = async () => {
        let users = await DataStore.query(User);
        // console.log(users);
        console.log(userData.photoUrl);
    }

    useInterval(() => {
      if(progress < 100) {
        setProgress(progress + 5);
      }
    }, 1000);

    useEffect(() => {
      Animated.timing(animation.current, {
        toValue: progress,
        duration: 100
      }).start();
    },[progress])

    const width = animation.current.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", '100%'],
      extrapolate: "clamp"
    })
    //Used for debugging, it'll delete the user in DataStore
    const deleteUser = async ({ navigation }) => {
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
        <View style={styles.progressBar}>
          <Animated.View style={[StyleSheet.absoluteFill], { backgroundColor: "#8BED4F", width,   borderRadius: 20 }}/>
        </View>
        <Text style={styles.distanceLabel}>{`Distance Achieved: ${progress} km`}</Text>
        <Text>{userData.email}</Text>
        <Text>{userData.password}</Text>
        <Image style={{width: 100, height: 100,}} source={{uri : userData.photoUrl}} />
        <Text>{userData.name}</Text>
        <Text>{userData.height}</Text>
        <Text>{userData.weight}</Text>
        <Button title="Fetch Data" onPress={() => {fetchData()}} />
        <Button title="Delete User" onPress={() => {deleteUser()}} />
    </View>
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent:'center',
      flex: 1
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
      borderColor: 'aqua',
      borderWidth: 2,
      borderRadius: 20,
      flexDirection:'row'
    },
    distanceLabel: {
      fontSize: 20,
      marginVertical: 30
    }
});

export default Home;