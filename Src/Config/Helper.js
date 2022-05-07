import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

function GetLocationPermission() {
    if (PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION) {
        return true
    } else {
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
            console.log("result--->", result)
        });
    }
}

const GetLocation = () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
        (result) => resolve(result),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
});

export { GetLocationPermission, GetLocation };
