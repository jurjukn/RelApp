import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView} from "react-native";
import React from "react";
import {BasicStyles, DottedLine, RelappLogoMain, Space, MainColors} from "../components/stylingComponents";
import {handleUserLogIn} from '../firebaseServices/Authentication';
import {sendEmail} from "../components/SendEmail";

export default function SignIn(props){
    const [email, onChangeEmail] = React.useState('Email');
    const [password, onChangePassword] = React.useState('Password');

    async function handleSignIn() {
        try {
            await handleUserLogIn(email, password); 
            props.navigation.navigate("Tabs");
          } catch (err) {
            alert("Incorrect email or password");
            throw err;
          }
    };

    const handleForgotPasswordBtn = () => {
        sendEmail(
            'cygaurelija@gmail.com',
               'RelApp forgot password',
            'I forgot my password. Please contact me. Email: (fill the form)',
         { cc: '' }
        ).then(() => {
            Alert.alert('Your message was successfully sent! You will be contacted as soon as possible');
        });
    }
    
    return (
        <KeyboardAvoidingView style={BasicStyles.signInStyle} behavior="padding" enabled>
            <View style={{width: "100%", alignItems: "center"}}>
                <Space size = {10}/>
                <RelappLogoMain/>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => onChangeEmail(text)}
                    autoCapitalize="none"
                    placeholder="email"
                />
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => onChangePassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholder="password"
                />
                <TouchableOpacity
                    style = {{marginStart: 150}}
                    onPress={() => handleForgotPasswordBtn()}>
                    <Text style={{fontSize: 15, color: MainColors.textDarkGrey, fontWeight: 'bold'}}>FORGOT PASSWORD</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSignIn()}>
                    <Text style={styles.buttonTextStyle}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={{width: "100%", alignItems: "center"}}>
                <Space size = {20}/>
                <DottedLine/>
            </View>

            <View style ={{flexDirection: 'row', marginTop: 50}}>
                <Text style={{color: MainColors.textDarkGrey, fontSize: 16}}>Don't have an account? </Text>
                <TouchableOpacity
                    style={{fontWeight: 'bold', color: MainColors.textDarkGrey, fontSize: 16}}
                    onPress={() => props.navigation.navigate("SignUp")}>
                    <Text style={{fontSize: 15, color: MainColors.textDarkGrey, fontWeight: 'bold'}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
export const styles = StyleSheet.create({
    textInputStyle: {
        borderColor: MainColors.borders,
        color: MainColors.textDarkGrey,
        borderStartWidth: 1,
        borderWidth: 2,
        width: "80%",
        height: 50,
        borderRadius: 5,
        margin: 10,
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
