import client from './axios.config';

const auth = '/auth';
const users = '/users';

const register = (firstName, lastName, email, password, type_user) => {
    return client
    .post(`${auth}/register`, {firstName, lastName, email, password, type_user})
    .then((res) => {console.log(res)})
}

const login = (email, password) => {
    try {
        return client
        .post(`${auth}/login`, {email,password})
        .then((res) => {
            if(res.data.token) {
                console.log(res.data.message)
                localStorage.setItem("user", JSON.stringify(res.data.token))
            }
            return res.data.token;
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