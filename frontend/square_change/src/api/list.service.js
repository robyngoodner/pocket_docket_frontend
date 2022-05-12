import client from './axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native'

const list = '/list';


// const currentUser = () => {
//     let user = AsyncStorage.getItem("userId");
//     return JSON.parse(user)
// }

async function createList (user, data) {
    user=JSON.parse(user);
    console.log("list service line 15 user and data: ", user, data)
    return client.post(`${list}/new`, data)
}

async function getLists (user, data) {
    //console.log("user ", user)    
    user=JSON.parse(user)
    return client.get(`${list}/${user}`, data)
    }
    
async function updateList (listId, data) {
    listId = JSON.parse(listId);
    return client.put(`${list}/${listId}/edit`, data)
}

async function deleteList (listId) {
    listId = JSON.parse(listId);
    await client.delete(`${list}/${listId}/delete`);
}
    


export {createList, getLists, updateList, deleteList}