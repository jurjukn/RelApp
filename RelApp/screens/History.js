import {View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";

import {RelappToolBar, Space} from "../components/stylingComponents";
import {RelappTextInput} from "../components/RelappTextInput";
import UserStatistics from "./../historyComponents/UserStatistics"
import RoutesList from "./../historyComponents/RoutesList"

import {getHistoryByUserId} from './../databaseServices/HistoryService'
import {getCurrentUser} from "./../firebaseServices/Authentication"


export default function History (props) {

    const [userHistory, setUserHistory] = useState([])

    useEffect(() => {
        try{
        const fetchData = async () => {
            const user = await getCurrentUser()
            console.log(user)
            const value = await getHistoryByUserId(user.id)
            console.log(value)
            if(value.length!==0){
                console.log(value)
                setUserHistory(value)
            }
        };
        fetchData();
        } catch (error) {
            alert("Error getting user history")
        }
    }, [])

    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {"History"}/>
            <View style={styles.mainContainer}>
                <View style={styles.userStatisticsContainer}>
                    {userHistory.length !== 0 &&
                        <UserStatistics userHistory={userHistory}/>
                    }
                </View>
                <View style={styles.searchBarContainer}>
                    <Space size = {30}/>
                    <RelappTextInput onChangeText = {(text)=>{setText(text)}}/>
                </View>
                <View style={styles.listContainer}>
                    <RoutesList userHistory={userHistory}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    searchBarContainer: {
        flex:1,
        width:"100%",
        alignItems: 'center'
    },
    listContainer: {
        flex: 4,
        width:'100%',
        backgroundColor: '#F1F1F1',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    userStatisticsContainer: {
        flex: 0.5,
    }
})

