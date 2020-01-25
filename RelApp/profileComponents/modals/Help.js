import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import React from "react";
import {sendEmail} from '../../components/SendEmail';
import {RelappToolBar, MainColors} from "../../components/stylingComponents";

export default function Help (props)
{
    const handleContactUsBtn = () => {
        sendEmail(
            'cygaurelija@gmail.com',
               'RelApp help',
            '',
         { cc: '' }
        ).then(() => {
            Alert.alert('Your message was successfully sent! You will be contacted as soon as possible');
        });
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <RelappToolBar 
                    text = {"Help"}
                    callback = {()=>props.callback()}
                />
            </View>
          
            <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.grayContainer}>
                    <Text style={styles.header}>What is RelApp?</Text>
                    <Text style={styles.textStyle}> 
                    The app is created for those who are exhausted physically and mentally after their day at work
                    or for those who want to recharge their batteries, by taking a pause from all the routine of their lives, 
                    pausing all the social media for a bit and taking time for themselves
                    to think about everything without any disturbance during this process. 
                    During this time you can visit some nice places that were recommended by other users of the application.
                    </Text>
                    <Text style={styles.header}>What can I do with RelApp?</Text>
                    <Text style={styles.textStyle}> 
                    The app provides opportunity to challenge yourself by creating new routes, 
                    or selecting more and more difficult routes to walk.
                    </Text>
                </View>

                <View style ={{flexDirection: 'column', marginVertical: 30, alignItems: 'center'}}>
                    <Text style={{color: '#4F4F4F', fontSize: 16}}>Didn't find the help you're looking for? </Text>
                    <TouchableOpacity
                        style={{fontWeight: 'bold', color: MainColors.textDarkGrey, fontSize: 16}}
                        onPress={() => handleContactUsBtn()}>
                        <Text style={{fontSize: 15, color: MainColors.textDarkGrey, fontWeight: 'bold'}}>Contact us</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export const styles = StyleSheet.create({
    headerView: {
        width: "100%",
        height: "10%",
        marginVertical: 10,
    },
    mainView:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    MainHeaderText: {
        fontWeight: 'bold',
        color: MainColors.textWhite,
        fontSize: 25,
    },
    grayContainer: {
        backgroundColor: MainColors.containerBackground,
        marginVertical: 20,
        width: "90%",
    },
    textStyle: {
        color: MainColors.textDarkGrey, 
        fontSize: 18, 
        marginEnd:'auto',
        marginVertical: 15,
    },
    header: {
        color: MainColors.textDarkGrey, 
        fontSize: 20, 
        marginEnd:'auto',
        marginVertical: 15,
        fontWeight: 'bold',
    },
})