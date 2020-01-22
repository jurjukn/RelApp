import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export const checkPermissions = async ()=>
{
    let checkPermission = await Permissions.askAsync(Permissions.LOCATION);
    if (checkPermission.status !== 'granted') {
        throw 'Permission to access location was denied'
    }
    if (! await Location.hasServicesEnabledAsync()) {
        throw 'Location.hasServicesEnabledAsync'
    }
    return "Ok";
};


export const getCurrentCoordinates = async () => {
    const coords = {latitude: "", longitude: ""}
    const getDeviceLocation = async () => {
        await checkPermissions();
        const result = await Location.getCurrentPositionAsync({enableHighAccuracy: true })
        return result.coords
    };
    const location = await getDeviceLocation()
    coords.latitude = location.latitude
    coords.longitude = location.longitude
    return coords
}

const distanceCoordinates = (lat1, lon1, lat2, lon2, unit)=>
{
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

export const createInitialRegionFromCord = (coord)=>
{
    return (
        {
            latitude: coord.latitude,
            longitude: coord.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
        }
    );
};

export const getDistance = (coord1,coord2)=>{return distanceCoordinates(coord1.latitude, coord1.longitude,
    coord2.latitude, coord2.longitude, "K")};

export const coordinatesExample = ()=>
{
    return(
        [
            {latitude: 46.4906700, longitude:  11.3398200,},
            {latitude: 46.9906700, longitude:  11.9398200,},
            {latitude: 47.4906700, longitude:  12.3398200,},
        ]
    )
}

export const DefaultInitialRegion = ()=> {
    return (
        {
            latitude: 49.4906700,
            longitude: 11.3398200,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
        }
    )
}


export const CreateInitialRegionByCurrentLocation = async () => {
    return new Promise(resolve => {
        getCurrentCoordinates()
            .then(response => {
                resolve(
                    {
                        latitude: response.latitude,
                        longitude: response.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }
                )
            })
            .catch(function (error) {
                console.log("Not successful api request",error);
                resolve(null)
            })
    });
}

export const selectColor = (index, last)=>{
    let color = '#fff900';
    switch (index) {
        case 0:
            color = '#25ff02';
            break;
        case last-1:
            color = '#ff001b';
            break;
        default:
            color = '#fff900';
            break;
    }
    return color;
};

export const generateTitle = (index, last)=>{
    let title = "";
    switch (index) {
        case 0:
            title = "Start !";
            break;
        case last-1:
            title = "Finish !";
            break;
        default:
            title = `${index}  checkpoint.`;
            break;
    }
    return title;
};
