import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView} from "react-native";
import React from "react";
import {BasicStyles, DottedLine, RelappLogoMain, Space, MainColors} from "../components/stylingComponents";
import {handleUserSignUp} from '../firebaseServices/Authentication';

export default function SignUp(props){
    const [name, onChangeName] = React.useState('Name');
    const [lastName, onChangeLastName] = React.useState('Last Name');
    const [email, onChangeEmail] = React.useState('Email');
    const [password, onChangePassword] = React.useState('Password');

    async function handleSignUp() {
        try {
            await handleUserSignUp(email, password, name);
            Alert.alert('Your account has been created! ');  
            props.navigation.navigate("Tabs");
          } catch (err) {
            alert(err);
            throw err;
          }
    };

    return (
        <View style={BasicStyles.signInStyle}>
            <KeyboardAvoidingView style={{width: "100%", alignItems: "center"}} behavior="padding" enabled>
                <Space size = {10}/>
                <RelappLogoMain/>
                <ScrollView style={{width: "100%"}} contentContainerStyle={{justifyContent : 'center', alignItems: 'center'}}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => onChangeName(text)}
                        placeholder={"Name"}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => onChangeLastName(text)}
                        placeholder={"Last name"}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => onChangeEmail(text)}
                        autoCapitalize="none"
                        placeholder={"Email"}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => onChangePassword(text)}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholder={"Password"}
                    />
                </ScrollView>
                <Space size = {20}/>
                <DottedLine/>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSignUp()}>
                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                </TouchableOpacity>

                <View style ={{flexDirection: 'row', marginTop: 50}}>
                    <Text style={{color: MainColors.textDarkGrey, fontSize: 16}}>Back to </Text>
                    <TouchableOpacity
                        style={{fontWeight: 'bold', color: MainColors.textDarkGrey, fontSize: 16}}
                        onPress={() => props.navigation.navigate("SignIn")}>
                        <Text style={{fontSize: 15, color: MainColors.textDarkGrey, fontWeight: 'bold'}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
export const styles = StyleSheet.create({
    textInputStyle: {
        height: 40,
        borderColor: MainColors.borders,
        color: MainColors.textDarkGrey,
        borderStartWidth: 1,
        borderWidth: 2,
        width: "80%",
        borderRadius: 5,
        margin: 15,
    },
    buttonStyle: {
        width: "90%",
        height: 40,
        backgroundColor: MainColors.greenColor,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    buttonTextStyle: {
        fontSize: 22,
        color: "white",
        fontWeight: 'bold'
    },
})