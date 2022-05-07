import client from './axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = '/auth';
const users = '/users';

const register = (user) => {
    console.log('auth.service front end user registration',user)
    return client
    .post(`${auth}/register`, user)
    .then((res) => {
        console.log("front end auth.service line 12 res.status",res.status)
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

const getProfile = () => {
    return client.get(`${users}/profile`)
}

const logout = () => {
    AsyncStorage.removeItem("user")
}

export {register, login, currentUser, getProfile, logout}