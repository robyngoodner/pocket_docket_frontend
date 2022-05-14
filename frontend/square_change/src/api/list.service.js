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
    console.log("getLists user ", user)    
    //user=JSON.parse(user)
    console.log("getLists user: ", user)
    return client.get(`${list}/${user}`, data)
    }

async function getList (id, data) {
    console.log('list.service line 26 id: ',id)
    id=JSON.parse(id)
    return client.get(`${list}/detail/${id}`, id, data)
}
    
async function updateList (listId, data) {
    return client.put(`${list}/${listId}/edit`, data)
}

async function deleteList (listId) {
    listId = JSON.parse(listId);
    await client.delete(`${list}/${listId}/delete`);
}
    


export {createList, getLists, getList, updateList, deleteList}