import client from './axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native'

const item = '/item';


// const currentUser = () => {
//     let user = AsyncStorage.getItem("userId");
//     return JSON.parse(user)
// }

async function createItem (data) {
    console.log("item service line 14 data: ", data)
    return client.post(`${item}/new`, data)
}

async function getItems (id, data) {
    console.log("item service line 19 get items id: ", id)
    return client.get(`${item}/${id}`, data)
}
    
async function updateItem (itemId, data) {
    return client.put(`${item}/${itemId}/edit`, data)
}

async function deleteList (listId) {
    listId = JSON.parse(listId);
    await client.delete(`${list}/${listId}/delete`);
}
    


export {createItem, getItems, updateItem, deleteList}