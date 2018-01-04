import axios from "axios";
import CONSTANT from "../constant";

const apiServer = CONSTANT.API.SERVER;

export function getAddresses() {
    return {
        type: "GET_ADDRESSES",
        payload: axios.get(`${apiServer + CONSTANT.API.ADDRESS}`)
    }
}

export function createAddress(address) {
    return {
        type: "CREATE_ADDRESS",
        payload: axios.post(`${apiServer + CONSTANT.API.ADDRESS}`, address)
    }
}

export function updateAddress(id, address) {
    return {
        type: "UPDATE_ADDRESS",
        payload: axios.put(`${apiServer + CONSTANT.API.ADDRESS_UPDATE}/${id}.json`, address)
    }
}

export function getCurrentAddress() {
    return dispatch => {
        dispatch((() => { return { type: "GET_CURRENT_ADDRESS_PENDING" } })());

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                var xmlhttp = new XMLHttpRequest();
                let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBH05PwLPf7CO1q_W_mqmXJNf6o1zb9l5I`;
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var res = JSON.parse(this.responseText);
                        if (res.status == "OK") {
                            let streetNumber = "", route = "", ward = "", district = "", city = "", country = "";
                            res.results[0].address_components.forEach((item) => {
                                if (item.types.indexOf("street_number") >= 0) streetNumber = item.long_name;
                                if (item.types.indexOf("route") >= 0) route = item.long_name;
                                if (item.types.indexOf("administrative_area_level_3") >= 0) ward = item.long_name;
                                if (item.types.indexOf("administrative_area_level_2") >= 0) district = item.long_name;
                                if (item.types.indexOf("administrative_area_level_1") >= 0) city = item.long_name;
                                if (item.types.indexOf("country") >= 0) country = item.long_name;
                            });
                            let address = {
                                street_name: streetNumber + " " + route,
                                ward,
                                district,
                                city,
                                country,
                            }
                            dispatch((() => { return { type: "GET_CURRENT_ADDRESS_FULFILLED", payload: address } })())
                        }
                    }
                };

                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            });
        } else {
            dispatch((() => { return { type: "GET_CURRENT_ADDRESS_REJECTED", payload: "Geolocation is not supported by this browser." } })())
        }
    }
}