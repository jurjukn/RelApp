import React, {useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants';
import MainNavigation from "./screens/Navigation";
import {TopSeparator} from "./components/stylingComponents";

export default function App()
{
    console.disableYellowBox = true;
    return (
        <View style={{flex: 1}}>
            <TopSeparator/>
            <MainNavigation/>
        </View>
    )
  }
