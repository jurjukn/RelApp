import {View, Text, StyleSheet, Modal} from "react-native";
import React, {useState, useEffect} from "react";
import {RelappToolBar, MainColors} from "../components/stylingComponents";
import UserInfo from '../profileComponents/UserInfo';
import AllRoutes from '../profileComponents/AllRoutes';
import {handlerUserSignOut} from "../firebaseServices/Authentication";
import Help from "../profileComponents/modals/Help";
import {getAllRoutes} from "../databaseServices/RouteService";
import {getCurrentUser} from '../firebaseServices/Authentication';

export default function Profiles(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [routesCreatedByUser, setRoutes] = useState([]);
    const [currentUserId, setCurrentUserId] = useState("");

    const helpIcon = {
        name:"md-help-circle",
        callback:()=>{setModalVisible(true)}
    };

    const logoutIcon = {
        name:"md-log-out",
        callback:()=>{signOut()}
    };

    const refreshIcon = {
        name:"md-refresh",
        callback:()=>{getRoutes()}
    };

    useEffect(() => {
        if(currentUserId === ""){
            getUserId();
        }
        if(routesCreatedByUser.length === 0){
            getRoutes();
        }
    });

    async function getUserId() {
        try {
            let data = await getCurrentUser();
            setCurrentUserId(data.id);
        } catch (err) {
            console.log(err);
        }     
    }

    async function getRoutes() {
        try {
            let data = await getAllRoutes();
            getRoutesCreatedByUser(data);
        } catch (err) {
            console.log(err);
        }     
    }

    const getRoutesCreatedByUser = (allRoutes) => {
        setRoutes(allRoutes.filter(item => item.ownerId === currentUserId))
        
    }

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
                           fourthIcon = {refreshIcon}
            />
            <UserInfo/>
            <View style={{margin: 10}}>
                <Text style={styles.textStyle}>Routes created by me</Text>
            </View>
            <AllRoutes navigation = {props.navigation} routesCreatedByUser = {routesCreatedByUser}/>
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
