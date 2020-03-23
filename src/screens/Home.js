import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Home = () => {
    return <View style={styles.container}>
        <Text style={{fontSize: 30}}>Welcome to the Home Page</Text>
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