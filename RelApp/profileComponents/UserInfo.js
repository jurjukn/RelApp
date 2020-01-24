import {View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TouchableHighlight} from "react-native";
import React, {useState, useEffect} from "react";
import ChangePassword from './modals/ChangePassword';
import {getCurrentUser} from '../firebaseServices/Authentication';
import {changeUserPassword} from '../firebaseServices/Authentication';

export default function UserInfo(){
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({name: "", email: ""});

    useEffect(() => {
        getUser();
    });

    async function handleChangePassword (currentPassword, newPassword) {
        try {
            await changeUserPassword(currentPassword, newPassword);
            Alert.alert("Password has been changed!");
            setModalVisible(!modalVisible);
        } catch (err) {
            alert("Wrong current password!");
        }
    }

    async function getUser() {
        try {
            let data = await getCurrentUser()
            setCurrentUser({name: data.name, email: data.email});
        } catch (err) {
            console.log(err);
        }     
    }

    const handleModalCallBack = (password, newPassword) => {
        if (password === null && newPassword === null) {
            setModalVisible(!modalVisible)
        } else {
            handleChangePassword(password, newPassword);
        }
    }
  
    return ( 
        <View >
            <Modal
                animationType = "slide"
                transparent = {false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Change password screen has been closed.');
                }}>

                <View style={{marginTop: 15}}>
                    <ChangePassword callback = {(passw, newPassw)=> handleModalCallBack(passw, newPassw)}/>
                </View>
            </Modal>
        
            <View style={styles.grayContainer}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.textStyle}> Name </Text>
                    <Text style={styles.userTextStyle}>{currentUser.name}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.textStyle}> Email </Text>
                    <Text style={styles.userTextStyle}>{currentUser.email}</Text>
                </View>
                <TouchableOpacity  
                    style={styles.buttonStyle}
                    onPress={() =>  setModalVisible(true)}>
                    <Text style={styles.buttonTextStyle}>Change password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    textStyle: {
        fontWeight: 'bold', 
        color: "#4F4F4F", 
        fontSize: 18, 
        marginEnd:'auto',
        marginVertical: 15,
    },
    userTextStyle: {
        color: "#4F4F4F", 
        fontSize: 18, 
        margin: 15,
    },
    buttonStyle: {
        width: "70%",
        height: 40,
        backgroundColor: '#3CCD76',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
        marginLeft: "15%"
    },
    buttonTextStyle: {
        fontSize: 22,
        color: "#F2F2F2",
        fontWeight: 'bold'
    },
    grayContainer: {
        backgroundColor: '#F4F4F4',
        margin: 10,
    },
})