import {StyleSheet, View, TextInput} from "react-native";
import {RelappLogo} from "../../../components/stylingComponents"
import React, {useState} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import {ProgressToolbar} from "../RoutePregessStyles";

function UselessTextInput(props) {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={40}
      />
    );
}

export default function CommentScreen(props)
{
    const [value, onChangeText] = useState('Please type your comment');
    return (
        <View style={{flex:1}}>
            <RelappLogo callback = {()=>{props.navigation.navigate("RatingScreen")}}/> 
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <ProgressToolbar header = {"Route IV"}/> 
                </View>
                <View style={styles.innerContainer}>
                    <View
                    style={{
                        backgroundColor: value,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        width:"100%",
                        paddingLeft:10
                    }}>
                        <UselessTextInput
                            multiline
                            numberOfLines={4}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                        />
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <RelappButton style = {ButtonTypes().mediumButton} text = "Finish" callback = {()=>{props.navigation.navigate("Tabs")}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E6E6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    innerContainer: {
        flex:1, 
        width:"100%", 
        alignItems:"center", 
        justifyContent:"center",
        padding:10
    },
})
