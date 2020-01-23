import {View, ScrollView, StyleSheet, FlatList, TouchableHighlight, Modal, Text} from "react-native";
import React, {useState} from "react";
import RouteCommentsList from "./RouteCommentsList"
import {RelappToolBar} from "../../components/stylingComponents";

export default function RouteCommentsModal(props)
{
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}>
            <View style={{flex:1, width:"100%"}}>
                <RelappToolBar callback = {()=>props.stopShowingModal()}/>
                <View style={{alignItems:"center", padding:10}}>
                    <Text style={{fontSize: 20}}>Comments</Text>
                </View>
                <View style={{padding:15}}>
                    <RouteCommentsList routeComments={props.comments} />
                </View>
            </View>
        </Modal>
    )
}



