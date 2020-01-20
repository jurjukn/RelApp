import React, {useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants';
import MainNavigation from "./screens/Navigation";

export default function App()
{
    return (
        <View style={{flex: 1, paddingTop: Constants.statusBarHeight}}>
            {/* <TopSeparator/> */}
            <MainNavigation/>
        </View>
    )
  }