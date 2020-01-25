import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {RelappToolBar} from "../../components/stylingComponents";

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

            <TouchableOpacity  
                style={styles.buttonStyle}
                onPress={() => props.callback(password, newPassword)}>
                <Text style={styles.buttonTextStyle}>Done</Text>
            </TouchableOpacity>
        
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
      color: '#F2F2F2',
      fontSize: 25,
    },
    grayContainer: {
      backgroundColor: '#F4F4F4',
      marginVertical: 80,
      width: "90%",
    },
    textStyle: {
      color: "#4F4F4F", 
      fontSize: 18, 
      marginEnd:'auto',
      marginVertical: 15,
    },
    input: {
      width: "50%",
      height: "50%",
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#333333',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15,
      fontSize: 12,
      color: "#4F4F4F",
    },
    buttonStyle: {
      width: "70%",
      height: 40,
      backgroundColor: '#3CCD76',
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 15,
  },
  buttonTextStyle: {
      fontSize: 22,
      color: "#F2F2F2",
      fontWeight: 'bold'
  },
})
