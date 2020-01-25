import {StyleSheet, View, TextInput, KeyboardAvoidingView} from "react-native";
import {RelappToolBar, MainColors} from "../../../components/stylingComponents"
import React, {useState} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import {getCurrentUser} from "./../../../firebaseServices/Authentication"

function UselessTextInput(props) {
    return (
      <TextInput
        {...props}
        editable
        maxLength={40}
        style = {{fontSize: 20, color: MainColors.textDarkGrey}}
      />
    );
}

export default function CommentScreen(props)
{
    const [value, onChangeText] = useState('');

    async function addToHistory(routeHistory){
        console.log("Here we add routeHistory to database")
        const user = await getCurrentUser()
        console.log(user)
        console.log(routeHistory)
    }

    function proceedToNextScreen(){
        
        const historyObject = props.navigation.state.params
        console.log(historyObject)
        addToHistory(
            {
                duration: historyObject.duration, 
                distance: historyObject.distance, 
                rating: historyObject.rating, 
                comments: value,
                routeId: historyObject.route.id
            }
        )
        props.navigation.navigate("Tabs")
    }

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
            <RelappToolBar text = "Comment"
                fontSize = {32}
                callback = {()=>{props.navigation.goBack()}}
            />
            <View style={styles.container}>
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
                            placeholder="Please type your comment"
                        />
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <RelappButton style = {ButtonTypes().largeButton} text = "Finish" callback = {()=>{proceedToNextScreen()}}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
