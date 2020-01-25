import {View, Text, StyleSheet, Modal} from "react-native";
import React, {useState} from "react";
import {RelappToolBar, MainColors} from "../components/stylingComponents";
import UserInfo from '../profileComponents/UserInfo';
import AllRoutes from '../profileComponents/AllRoutes';
import {handlerUserSignOut} from "../firebaseServices/Authentication";
import Help from "../profileComponents/modals/Help";

export default function Profiles(props){
    const [modalVisible, setModalVisible] = useState(false);
    const helpIcon = {
        name:"md-help-circle",
        callback:()=>{setModalVisible(true)}
    };
    
    const logoutIcon = {
        name:"md-log-out",
        callback:()=>{signOut()}
    };
    
    async function signOut() {
        try {
            data = await handlerUserSignOut()
            props.navigation.navigate("SignIn")
        } catch (err) {
            console.log(err);
        }     
    }

    const handleCallback = () =>{
        setModalVisible(!modalVisible)
    }
    
    return (
        <View style={{flex: 1}}>
            <Modal
                animationType = "slide"
                transparent = {false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Help screen has been closed.');
                }}>

                <View style={{marginTop: 15}}>
                    <Help callback = {() => handleCallback()}/>
                </View>
            </Modal>
            <RelappToolBar text = {"Profile"}
                           secondIcon = {helpIcon}
                           thirdIcon = {logoutIcon}
            />
            <UserInfo/>
            <View style={{margin: 10}}>
                <Text style={styles.textStyle}>Routes created by me</Text>
            </View>
            <AllRoutes navigation = {props.navigation}/>
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
    grayContainer: {
        backgroundColor: MainColors.containerBackground,
        margin: 10,
        alignItems: "center",
    },
})
