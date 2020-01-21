import {View, Text, StyleSheet, TextInput} from "react-native";
import React, {useState} from "react";

export default function ChangePassword (props)
{
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verifiedPassword, setVerifiedPassword] = useState("");

    return (
        <View style={styles.mainView}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Change password</Text>
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
            <View style={{flexDirection: "row"}}>
                <Text style={styles.textStyle}>Verify password </Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  secureTextEntry={true}
                  onChangeText={(text) => setVerifiedPassword(text)}
                />
            </View>
        </View>
          
        </View>
    )
}

export const styles = StyleSheet.create({
    headerView: {
        width: "100%",
        backgroundColor: '#3CCD76',
        alignItems: 'center',
        justifyContent: 'center',
        height: "13%",
        marginVertical: 15,
    },
    mainView:{
        alignItems: 'center',
        justifyContent: 'center',
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
})
