import { axios } from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

const backendAPI = "http://localhost:3000/api";

let user = JSON.parse(AsyncStorage.getItem("user"))

const client = axios.create({
	baseURL: `${backendAPI}`,
	headers: {
		"Content-type": "application/json",
		authorization: `Bearer ${user}`
	},
});

//https://blog.logrocket.com/using-axios-react-native-manage-api-requests/

export default client;