import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from "react-native";
import React from "react";
import {BasicStyles, DottedLine, RelappLogoMain} from "../components/stylingComponents";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignIn(props){
    const [email, onChangeEmail] = React.useState('Email');
    const [password, onChangePassword] = React.useState('Password');

    return (
        <View style={BasicStyles.signInStyle}>
            <View style={{width: "100%", alignItems: "center", top: -100, marginBottom: -40}}>
                <RelappLogoMain/>
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
                <TouchableOpacity
                    style = {{marginStart: 150}}
                    onPress={() => Alert.alert('Forgot password button pressed')}>
                    <Text style={{fontSize: 15, color: '#4F4F4F', fontWeight: 'bold'}}>FORGOT PASSWORD</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => props.navigation.navigate("Tabs")}>
                    <Text style={styles.buttonTextStyle}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={{width: "100%", alignItems: "center"}}>
                <DottedLine/>
                <Text style={{fontSize: 20, color: "#4F4F4F"}}>OR</Text>
                <DottedLine/>

                <View style={{flexDirection: "row", marginTop: 10}}>
                    <TouchableOpacity style ={{start:-120}} onPress={() => Alert.alert('GMAIL login pressed')}>
                        <MaterialCommunityIcons
                            name={"email-outline"}
                            size={45}
                            color={"gray"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style ={{start: 120}}  onPress={() => Alert.alert('FB login pressed')}>
                        <MaterialCommunityIcons
                            name={"facebook"}
                            size={45}
                            color={"gray"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style ={{flexDirection: 'row', marginTop: 50}}>
                <Text style={{color: '#4F4F4F', fontSize: 16}}>Don't have an account? </Text>
                <TouchableOpacity
                    style={{fontWeight: 'bold', color: '#4F4F4F', fontSize: 16}}
                    onPress={() => props.navigation.navigate("SignUp")}>
                    <Text style={{fontSize: 15, color: '#4F4F4F', fontWeight: 'bold'}}>Sign up</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}
export const styles = StyleSheet.create({
    textInputStyle: {
        borderColor: '#4F4F4F',
        color: "#4F4F4F",
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
