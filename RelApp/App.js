import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions,StatusBar} from 'react-native';
import Navigation from "./screens/Navigation";

export default function App()
{
    return (
        <View style={{flex: 1}}>
            <Navigation/>
        </View>
    )
  }

