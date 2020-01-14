import {ScrollView, StyleSheet, Text, TouchableOpacity, View, CheckBox} from "react-native";
import React, {useState} from "react";
import {IconsComponent} from "../../components/stylingComponents";
import {RouteItemStyles} from "../RouteItem";


export function ProgressToolbar (props)
{
    return(
        <View style = {styles.headerContainer}>
            <View style = {styles.centralizedContainer}>
                <IconsComponent name = {"md-undo"} style={{...styles.iconView, right:'100%'}} callback = {props.goBack}/>
                <Text style={{...styles.headerText, right:'30%'}} > {props.header} </Text>
            </View>
            <View style = {styles.separationLine}/>
        </View>
    )
}


export default function ProgramItem(props)
{
    const [checked, isChecked] = useState(false)
    const onChange = () =>
    {
        props.callback(props.name)
        isChecked(!checked)
    }
    return (
        <View style={RouteItemStyles.customView}>
            <View style={RouteItemStyles.secondView}>
                <View style={RouteItemStyles.descriptionView}>
                    <Text style={RouteItemStyles.textStyle} >{props.name}</Text>
                </View>
                <View style={RouteItemStyles.iconView}>
                    <CheckBox
                        center
                        title='Click Here'
                        value={checked}
                        onChange={() => onChange()}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    centralizedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    separationLine: {
        width:'100%',
        borderColor: '#929292',
        borderWidth: 2,
        borderRadius: 2,
    },
    iconView:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 38,
    },

})
