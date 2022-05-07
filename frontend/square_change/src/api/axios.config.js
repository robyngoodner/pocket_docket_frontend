// import { axios } from 'react-native-axios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendAPI = "http://localhost:3000/api";
axios.defaults.baseURL = backendAPI

// let user = AsyncStorage.getItem("user")

// const client = axios.create({
// 	baseURL: `${backendAPI}`,
// 	headers: {
// 		"Content-type": "application/json",
// 		authorization: `Bearer ${user}`
// 	},
// });

const client = axios.create()

client.interceptors.request.use(
	async config => {
		const token = await AsyncStorage.getItem('token')
		//console.log(token)
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
			console.log(config.headers.Authorization)
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

//https://blog.logrocket.com/using-axios-react-native-manage-api-requests/

export default client;