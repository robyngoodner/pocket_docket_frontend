import axios from 'axios';

const backendAPI = "http://localhost:4000/api";

let user = JSON.parse(localStorage.getItem("user"))

const client = axios.create({
	baseURL: `${backendAPI}`,
	headers: {
		"Content-type": "application/json",
		authorization: `Bearer ${user}`
	},
});

//https://blog.logrocket.com/using-axios-react-native-manage-api-requests/

export default client;