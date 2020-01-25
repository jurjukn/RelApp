import {StyleSheet, View, TextInput, KeyboardAvoidingView} from "react-native";
import {RelappToolBar, MainColors} from "../../../components/stylingComponents"
import React, {useState} from "react";
import {ButtonTypes, RelappButton} from "../../../components/RelappButton";
import {getCurrentUser} from "./../../../firebaseServices/Authentication"
import {insertHistoryRecord} from "./../../../databaseServices/HistoryService"
import {insertRouteComment} from "./../../../databaseServices/CommentService"

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
    const [userId, setUserId] = useState(null)

    async function addToHistory(routeHistory){
        const user = await getCurrentUser()
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        const dateObject = {day: dd, month: mm, year: yyyy}
        await insertHistoryRecord(
            true, 
            dateObject, 
            routeHistory.distance, 
            routeHistory.duration, 
            routeHistory.rating, 
            routeHistory.routeId, user.id
        );
        await insertRouteComment(routeHistory.comments, user.name, routeHistory.routeId)
    }

    function proceedToNextScreen(){
        const historyObject = props.navigation.state.params
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
