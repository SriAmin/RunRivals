import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

const Profile = (props) => {
    //Will contain the data passed into this class
    const [userData, setUserData] = useState(props.navigation.getParam('userData'));
    const isUser = props.navigation.getParam('isUser');
    const [passwordHeader, setPasswordHeader] = useState(<View></View>);
    const [passwordData, setPasswordData] = useState(<View></View>);

    //Based on isUser condition, it'll render the password data
    useEffect(() => {
        //If the profile is the user signed in currently
        if (isUser == true) {
            setPasswordHeader(<Text style={styles.infoText}>Password:</Text>)
            setPasswordData(<Text style={styles.infoText}>{userData.password}</Text>)
        }
    }, [])

    return <View style={styles.container}>
        <View style={styles.main}>
            <Image style={styles.imageStyle} source={{uri : userData.photoUrl}} />
            <Text style={{fontSize: 25, marginTop: 15, marginLeft: 50, color: "#65418F", fontWeight:"500"}}>{userData.name}</Text>
        </View>
        <View style={styles.secondary}>
            <View>
                <Text style={styles.infoText}>Email:</Text>
                {passwordHeader}
                <Text style={styles.infoText}>Height:</Text>
                <Text style={styles.infoText}>Weight:</Text>
            </View>
            <View>
                <Text style={styles.infoText}>{userData.email}</Text>
                {passwordData}
                <Text style={styles.infoText}>{userData.height} cm</Text>
                <Text style={styles.infoText}>{userData.weight} lbs</Text>
            </View>
        </View>
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
        flex: 3,
        alignItems: "flex-start",
        flexDirection: "row",
        borderBottomWidth: 2,
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
    }
});

export default Profile;