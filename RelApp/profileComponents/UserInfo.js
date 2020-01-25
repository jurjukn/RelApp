import {View, Text, StyleSheet, Alert, Modal} from "react-native";
import React, {useState} from "react";
import ChangePassword from './modals/ChangePassword';
import {getCurrentUser} from '../firebaseServices/Authentication';
import {changeUserPassword} from '../firebaseServices/Authentication';
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {MainColors} from '../components/stylingComponents';

export default function UserInfo(){
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({name: "", email: ""});

    if (currentUser.name === "" && currentUser.email === ""){
        getUser();
    }
    
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
                <View style={{alignItems:'center',justifyContent:'center'}}> 
                    <RelappButton 
                        style = {ButtonTypes().mediumButton} 
                        text = "Change password" 
                        callback = {()=> setModalVisible(true)}
                    />
                </View>
                
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    textStyle: {
        fontWeight: 'bold', 
        color: MainColors.textDarkGrey, 
        fontSize: 18, 
        marginEnd:'auto',
        marginVertical: 15,
    },
    userTextStyle: {
        color: MainColors.textDarkGrey, 
        fontSize: 18, 
        margin: 15,
    },
    buttonStyle: {
        width: "70%",
        height: 40,
        backgroundColor: MainColors.greenColor,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
        marginLeft: "15%"
    },
    buttonTextStyle: {
        fontSize: 22,
        color: MainColors.buttonTextStyle,
        fontWeight: 'bold'
    },
    grayContainer: {
        backgroundColor: MainColors.containerBackground,
        margin: 10,
    },
})