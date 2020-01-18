import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions,StatusBar} from 'react-native';
import MainNavigation from "./screens/Navigation";
import {TopSeparator} from "./components/stylingComponents";

export default function App()
{
    return (
        <View style={{flex: 1}}>
            <TopSeparator/>
            <MainNavigation/>
        </View>
    )
  }

