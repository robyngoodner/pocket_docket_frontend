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

 const getProfile = async () => {
    await AsyncStorage.getItem('user')  
    .then((user) => {
        user=JSON.parse(user)
        // console.log("auth service front end line 44 ",user)
        // if (user !== null) {
            // console.log("front end auth service line 41 ", user)
        client.get(`${auth}${users}/${user}`, user)
        .then((res) =>{
            console.log("res.data: ",res.data)
            return res.data
        })          
        // }
    })
    .catch (err =>{
        console.log("front end auth service error line 52: ",err)
        return err
    })
    
    
 }

const logout = () => {
    AsyncStorage.removeItem("user")
}

export {register, login, currentUser, getProfile, logout}