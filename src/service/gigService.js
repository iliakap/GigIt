// this is use able service axios calls

import axios from 'axios';

// const BASE_URL = 'http://localhost:3000';

var BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/gig' : '//localhost:3001/api/gig';


export default {
    query,
    getById,
    remove,
    update,
    getDistFromUser
}

function query({byTitle = '', byCategory = '',isActive = true} = {}) {
    let REQ_URL = `${BASE_URL}?byTitle=${byTitle}&byCategory=${byCategory}&isActive=${isActive}`
    return axios.get(REQ_URL)
        .then(res => res.data)

}


function getById(gigId) {
    return axios.get(`${BASE_URL}/${gigId}`)
        .then(res => res.data)
}
function remove(gigId) {
    return axios.delete(`${BASE_URL}/${gigId}`)
}

function update(gig) {
    if (gig._id) {
        return axios.put(`${BASE_URL}/${gig._id}`, gig).then(res => res.data)
    }
    else {
        return axios.post(`${BASE_URL}`, gig).then(res => res.data)
    }
}

function getDistFromUser(gig, userLocation) {
    if (!userLocation)
        if (!gig) return
    var lat1 = userLocation.position.lat
    var lon1 = userLocation.position.lng
    var lat2 = gig.details.location.lat
    var lon2 = gig.details.location.lng
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    gig.details.pos.dist = d.toFixed(1)

    return gig;
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

}