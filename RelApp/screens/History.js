import {View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";

import {RelappLogo, Space} from "../components/stylingComponents";
import {RelappSearch} from "../components/RelappTextInput";
import UserStatistics from "./../historyComponents/UserStatistics"
import RoutesList from "./../historyComponents/RoutesList"

import {getHistoryByUserId} from './../databaseServices/HistoryService'


export default function History (props) {

    const [userHistory, setUserHistory] = useState([])

    useEffect(() => {
        try{ 
        const fetchData = async () => {
            const value = await getHistoryByUserId("UserId1")
            if(value.length!==0){
                setUserHistory(value)
            }
        };
        fetchData();
        } catch (error) {
            alert("Error getting user history")
        }
    }, []);

    return (
        <View style={{flex: 1}}>
            <RelappLogo/>
            <View style={styles.mainContainer}>
                <View style={styles.searchBarContainer}>
                    <Space size = {30}/>
                    <RelappSearch onChangeText = {(text)=>{setText(text)}}/>
                </View>
                <View style={styles.listContainer}>
                    <RoutesList userHistory={userHistory}/>
                </View>
                <View style={styles.userStatisticsContainer}>
                    {userHistory.length !== 0 && 
                        <UserStatistics userHistory={userHistory}/>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F0E6E6',
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
        left:10,
        width:'100%',
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    userStatisticsContainer: {
        flex:1
    }
})

