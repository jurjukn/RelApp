import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from "react-native";
import React from "react";
import {BasicStyles, DottedLine, RelappLogoMain} from "../components/stylingComponents";

export default function SignUp(props){
    const [name, onChangeName] = React.useState('Name');
    const [lastName, onChangeLastName] = React.useState('Last Name');
    const [email, onChangeEmail] = React.useState('Email');
    const [password, onChangePassword] = React.useState('Password');

    const handleSignUp = () => {
        Alert.alert('Your account has been created! ');
        props.navigation.navigate("Tabs");
    }

    return (
        <View style={BasicStyles.signInStyle}>
            <View style={{width: "100%", alignItems: "center", top: -100, marginBottom: -40}}>
                <RelappLogoMain/>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => onChangeName(text)}
                    value={name}
                />
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => onChangeLastName(text)}
                    value={lastName}
                />
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => onChangeEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => onChangePassword(text)}
                    value={password}
                />
                <DottedLine/>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => handleSignUp()}>
                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export const styles = StyleSheet.create({
    textInputStyle: {
        height: 40,
        borderColor: '#4F4F4F',
        color: "#4F4F4F",
        borderStartWidth: 1,
        borderWidth: 2,
        width: "80%",
        borderRadius: 5,
        margin: 15,
    },
    buttonStyle: {
        width: "90%",
        height: 40,
        backgroundColor: '#3CCD76',
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
