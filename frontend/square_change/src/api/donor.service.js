import client from './axios.config';

const users = '/users';
const donors = '/donors';

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