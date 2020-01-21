import {View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TouchableHighlight} from "react-native";
import React, {useState} from "react";
import ChangePassword from "./ChangePassword";

export default function UserInfo(props){
    const [modalVisible, setModalVisible] = useState(false);

    const handleChangePassword = () =>{
        Alert.alert("Password has been changed!")
        setModalVisible(!modalVisible)
    }

    return ( 
    <View >
        <Modal
            animationType = "slide"
            transparent = {false}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>

            <View style={{marginTop: 15}}>
                <View>
                    <ChangePassword/>
                    <TouchableOpacity  
                        style={styles.buttonStyle}
                        onPress={() => handleChangePassword()}>
                        <Text style={styles.buttonTextStyle}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                        style={styles.buttonStyle}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.buttonTextStyle}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
       

        <View style={styles.grayContainer}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.textStyle}> Name </Text>
                <Text style={styles.userTextStyle}>Aurelija</Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.textStyle}> Last Name </Text>
                <Text style={styles.userTextStyle}>Cygaite</Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.textStyle}> Email </Text>
                <Text style={styles.userTextStyle}>acygaite@unibz.it</Text>
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