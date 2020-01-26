import {View, ScrollView,} from "react-native";
import React, {useState} from "react";
import ShowingMap from "./Maps/ShowingMap";
import {RelappToolBar, Space} from "../components/stylingComponents";
import {RouteAddress, RouteDescription, RouteStyles} from "./RoutesStyles";
import {addRouteAsFavorite, removeRouteFromFavorites} from "../databaseServices/RouteService";
import RouteCommentsModal from "./routeComments/RouteCommentsModal"
import {getAddressByRouteId} from "../databaseServices/AddressService";
import {ButtonTypes, RelappButton} from "../components/RelappButton";
import {getRouteComments} from "../databaseServices/CommentService";


export default function SingleRoute(props)
{
    const [data, setData] = useState(null);
    const [address, setAddress] = useState(null);
    const [favorite, isFavorite] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [comments, setComments] = useState([]);

    const closeCommentsModal = () => {
        setModalVisible(false)
    };

    const userData = props.navigation.getParam('userData', 'default value');

    if(data===null)
    {
        const routeData = props.navigation.getParam('routeData', 'default value');
        setData(routeData);
        isFavorite(routeData.isFavorite);
        getAddressByRouteId(routeData.id).then(r=>
        {
            if(r!== undefined )
            {
                setAddress(r);
            }
        });
        getRouteComments(routeData.id).then(r =>
        {
            const comments = r.map(
                (x)=>{
                    return(
                        {
                            UserId: x.username,
                            Comment: x.comment,
                        }
                    )
                }
            );
            setComments(comments);
        });
    }

    const commentsIcon = {
        name:"md-chatboxes",
        callback:()=>{setModalVisible(true)}
    };

    const favoriteIcon = {
        name:favorite ? 'md-star' : 'md-star-outline',
        callback:()=>{
            if(favorite) {
                removeRouteFromFavorites(userData.id, data.id).then();
            }else {
                addRouteAsFavorite(userData.id, data.id).then();
            }
            isFavorite(!favorite);
        }
    };

    return (
        <View style={{flex: 1}}>
            <RelappToolBar text = {data===null ? null : data.title}
                           fontSize = {32}
                           callback = {()=>props.navigation.goBack()}
                           secondIcon = {favoriteIcon}
                           thirdIcon = {commentsIcon}
            />
            <View style={RouteStyles.container}>
                <ScrollView>
                    {modalVisible === true &&
                        <View style={{width:"100%"}}>
                        <RouteCommentsModal
                            modalVisible={true}
                            stopShowingModal={()=>closeCommentsModal()}
                            comments = {comments}
                        />
                        </View>
                    }
                    <Space size = {20}/>
                    <RouteDescription description = {data===null ? null : data.description}/>
                    <Space size = {20}/>
                    <RouteAddress country ={address===null ? null : address.country}
                                  region ={address===null ? null : address.region}
                                  city ={address===null ? null : address.city}/>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <ShowingMap markers ={address=== null ? null : address.coordinates}/>
                    </View>
                    <Space size = {20}/>
                    <View style={RouteStyles.centeredContainer}>
                        <RelappButton
                            style = {ButtonTypes().largeButton}
                            text = "Start"
                            callback = {()=>{
                                props.navigation.navigate("GoingScreen", {coordinates:address.coordinates, route: (data===null? null : data)})
                            }}
                        />
                    </View>
                    <Space size = {20}/>
                </ScrollView>
            </View>
        </View>
    )
}
