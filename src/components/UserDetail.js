import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserDetail = (props) => {
    let viewStyle = () => {
        if (props.data.isUser) {
            return {
                flex: 1,
                borderWidth: 1,
                flexDirection: "row",
                borderColor: "#00b4cf",
                borderRadius: 5,
                backgroundColor: "#cdf2f7"
            }
        }
        else {
            return {
                flex: 1,
                borderWidth: 1,
                flexDirection: "row",
                borderColor: "#00b4cf",
                borderRadius: 5,
            }
        }
    }

    return <TouchableOpacity style={viewStyle()} onPress={() => {}}>
        <View style={styles.rankContainer}>
            <Text style={[styles.textStyle, {fontSize: 25}]}># {props.rank}</Text>
            <Text style={[styles.textStyle, {fontSize: 18}]}>{props.data.distance} m</Text>
        </View>
        <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={{uri: props.data.photoUrl}}/>
            <Text style={styles.username}>{props.data.name}</Text>
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.textStyle}>{props.data.weight} lbs</Text>
            <Text style={styles.textStyle}>{props.data.height} cm</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        flexDirection: "row",
        borderRadius: 5,
    },
    rankContainer: {
        marginLeft: 15,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        flex: 3,
        marginLeft: 15,
        marginVertical: 15,
        alignItems: "center",
    },
    bodyContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    imageStyle: {
        width: 100, 
        height: 100, 
        borderWidth: 1, 
        borderRadius: 25,
    },
    username: {
        fontSize: 16,
        marginTop: 5,
    },
    textStyle: {
        color: "#65418F",
        fontSize: 14,
        fontWeight: "500"
    }
})

export default UserDetail;