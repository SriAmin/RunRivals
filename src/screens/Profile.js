import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = (props) => {
    //Will contain the data passed into this class
    const [userData, setUserData] = useState(props.navigation.getParam('userData'));
    const isUser = props.navigation.getParam('isUser');
    const [passwordHeader, setPasswordHeader] = useState(<View></View>);
    const [passwordData, setPasswordData] = useState(<View></View>);
    const [changeButton, setChangeButton] = useState(<View style={styles.ternary}></View>);

    //Based on isUser condition, it'll render the password data
    useEffect(() => {
        //If the profile is the user signed in currently
        if (isUser == true) {
            console.log(userData)
            setPasswordHeader(<Text style={[styles.infoText, {fontWeight: "500"}]}>Password:</Text>)
            setPasswordData(<Text style={styles.infoText}>{userData.password}</Text>)
            setChangeButton(
                <View style={styles.ternary}>
                    <TouchableOpacity onPress={() => {props.navigation.navigate("Update Profile", {data:userData})}}>
                        <Text style={styles.changeButton}>Change Information</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }, [])

    const updateProfile = () => {
        
    }

    return <View style={styles.container}>
        <View style={styles.main}>
            <Image style={styles.imageStyle} source={{uri : userData.photoUrl}} />
            <Text style={{fontSize: 25, marginTop: 15, marginLeft: 50, color: "#65418F", fontWeight:"500"}}>{userData.name}</Text>
        </View>
        <View style={styles.secondary}>
            <View>
                <Text style={[styles.infoText, {fontWeight: "500"}]}>Email:</Text>
                {passwordHeader}
                <Text style={[styles.infoText, {fontWeight: "500"}]}>Height:</Text>
                <Text style={[styles.infoText, {fontWeight: "500"}]}>Weight:</Text>
                <Text style={[styles.infoText, {fontWeight: "500"}]}>Distance:</Text>
            </View>
            <View>
                <Text style={styles.infoText}>{userData.email}</Text>
                {passwordData}
                <Text style={styles.infoText}>{userData.height} cm</Text>
                <Text style={styles.infoText}>{userData.weight} lbs</Text>
                <Text style={styles.infoText}>{userData.distance} m</Text>
            </View>
        </View>
        {changeButton}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    secondary: {
        borderTopWidth: 2,
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 2,
        padding: 50,
    },
    ternary: {
        flex: 2,
        alignItems: "center",
    },
    imageStyle: {
        width: 125,
        height: 125,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#65418F"
    },
    infoText: {
        fontSize: 20,
        padding: 15,
        fontWeight: "300",
    },
    changeButton: {
        marginTop: 35,
        borderWidth: 3,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: "#65418F",
        marginHorizontal: 15,
        borderRadius: 20,
        fontSize: 16,
    },
});

export default Profile;