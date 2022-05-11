import client from './axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native'

const auth = '/auth';
const users = '/users';

const register = (user) => {
    // console.log('auth.service front end user registration',user)
    return client
    .post(`${auth}/register`, user)
    .then((res) => {
        // console.log("front end auth.service line 12 res.status",res.status)
        //automatically create correct type of user
        //donorService.create etc?
        return res;
    })
}

const login = (user) => {
    try {
        return client
        .post(`${auth}/login`, user)
        .then((res) => {
            if(res.data.token) {
                AsyncStorage.setItem("token", JSON.stringify(res.data.token))
                AsyncStorage.setItem("user", JSON.stringify(user.email))
            }
            return res;
        })
    }catch(err){
        console.log(err)
    }
}

const currentUser = () => {
    let user = AsyncStorage.getItem("user");
    return JSON.parse(user)
}



 async function getProfile (user, data) {
    //console.log("user ", user)    
    user=JSON.parse(user)
    return client.get(`${auth}${users}/${user}`, data)
    }
    
async function deleteProfile (user) {
    user = JSON.parse(user);
    AsyncStorage.removeItem("user");
    await client.delete(`${auth}${users}/${user}/delete`);
    // redirect (`/`)
}
    

const logout = () => {
    AsyncStorage.removeItem("user")
}

export {register, login, currentUser, getProfile, logout, deleteProfile}