import client from './axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const users = '/users';
const donors = '/donor';

const getDonor = (user) => {
    try {
        return client
        .get(`${users}${donors}/profile`, user)
        .then((res) => {
            return res
        })
    } catch (err) {
        console.log(err)
    }
}

export { getDonor }