import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Constants from "expo-constants";


export const MainColors = {
    greenColor: '#3CCD76',
    textWhite:'#F2F2F2',
    iconWhite:'#FFFFFF',
    containerBackground:'#F4F4F4',
    iconGrey:'#333333',
    backgroundColor:'#FFFFFF',
    greyBackgroundColor:'#F1F1F1',
    textDarkGrey: '#4F4F4F',
    borders: '#333333',
};

    export const TopSeparator = ()=> {
    return(
        <View style={{
            width: '100%',
            backgroundColor: MainColors.greenColor,
            paddingTop: Constants.statusBarHeight,
        }}/>
    )
};

export const Space = (props)=>{
    return <View style={{height: props.size,}}/>}

export function IconsComponent (props)
{
    return(
        <View style={props.style}>
            <TouchableOpacity  onPress={props.callback}>
                <Ionicons name={props.name} size={32} color={props.iconWhite === undefined ? 'black' : props.iconWhite} />
            </TouchableOpacity>
        </View>
    )
}

export function RelappLogoMain()
{
    return (
        <View style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
            <Text style={{fontWeight: 'bold', color: MainColors.greenColor, fontSize:70 }}>RelApp</Text>
        </View>
    )
}
export function RelappToolBar(props)
{
    return (
        <View style= {RelappToolBarStyles.container}>
            {props.callback !== undefined ?
                <IconsComponent name = {"md-arrow-round-back"}
                                style={RelappToolBarStyles.undoIcon}
                                callback = {props.callback}
                                iconWhite = {MainColors.iconWhite}/>
                                : null}
            <Text style={{...RelappToolBarStyles.text,
                fontSize: (props.fontSize === undefined ? 36 : props.fontSize),
            }
            }>
                {props.text === undefined ? "RelApp" : props.text}
            </Text>

            {props.secondIcon !== undefined ?
                <IconsComponent name = {props.secondIcon.name} style={{
                    position: 'absolute',
                    right:     5,
                    top:      15,
                    }}
                                iconWhite = {MainColors.iconWhite}
                                callback = {props.secondIcon.callback}
                /> : null}
            {props.thirdIcon !== undefined ?
                <IconsComponent name = {props.thirdIcon.name} style={{
                    position: 'absolute',
                    right:     40,
                    top:      15,
                    }}
                                iconWhite = {MainColors.iconWhite}
                                callback = {props.thirdIcon.callback}
                /> : null}

            {props.fourthIcon !== undefined ?
                <IconsComponent name = {props.fourthIcon.name} style={{
                    position: 'absolute',
                    right:     80,
                    top:      15,
                }}
                                iconWhite = {MainColors.iconWhite}
                                callback = {props.fourthIcon.callback}
                /> : null}

        </View>
    )
}

const RelappToolBarStyles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        backgroundColor: MainColors.greenColor,
    },
    undoIcon:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        left:     10,
        top:      15,
    },
    text:{
        fontWeight: 'bold',
        fontSize:36,
        color:MainColors.textWhite,
    }

});

export const DottedLine = () =>{
    return (
        <View style= {{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={BasicStyles.dottedLineStyle}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
        </View>
    )
};

export const RelappHeader = (props)=>{
    return (
        <View style= {{ alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{fontWeight: 'bold', fontSize:props.size, textAlign: 'center', }}  >{props.text}</Text>
        </View>
    )
}

export const BasicStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainColors.backgroundColor,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInStyle: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dottedLineStyle: {
        color: "gray",
        fontSize: 15,
        textShadowColor: 'gray',
        textShadowOffset: { height: 3, width: 0 },
        textShadowRadius: 3,
    },
});
