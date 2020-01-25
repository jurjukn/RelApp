import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {RelappToolBar, MainColors} from "../../components/stylingComponents";
import {ButtonTypes, RelappButton} from "../../components/RelappButton";

export default function ChangePassword (props)
{
    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    return (
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <RelappToolBar 
                    text = {"Change password"}
                    callback = {()=>props.callback(password, newPassword)}
                />
            </View>
            
            <View style={styles.grayContainer}>
              <View style={{flexDirection: "row"}}>
                  <Text style={styles.textStyle}>Current password </Text>
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                  />
              </View>
              <View style={{flexDirection: "row"}}>
                  <Text style={styles.textStyle}>New password </Text>
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    secureTextEntry={true}
                    onChangeText={(text) => setNewPassword(text)}
                  />
              </View>
            </View>

            <RelappButton 
                style = {ButtonTypes().mediumButton} 
                text = "Done" 
                callback = {() => props.callback(password, newPassword)}
            />
        
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
    headerText: {
      fontWeight: 'bold',
      color: MainColors.textWhite,
      fontSize: 25,
    },
    grayContainer: {
      backgroundColor: MainColors.containerBackground,
      marginVertical: 80,
      width: "90%",
    },
    textStyle: {
      color: MainColors.textDarkGrey, 
      fontSize: 18, 
      marginEnd:'auto',
      marginVertical: 15,
    },
    input: {
      width: "50%",
      height: "50%",
      borderRadius: 3,
      borderWidth: 1,
      borderColor: MainColors.borders,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15,
      fontSize: 12,
      color: MainColors.textDarkGrey,
    },
})
