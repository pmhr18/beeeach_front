import axios from "axios";

// interface Brewery {
//   name: string;
// 	formal_name: string;
// 	address: string;
// 	accsss: string;
// 	created_at: Date;
// 	update_at: Date;
// }

export const apiClient = axios.create({
	baseURL: process.env.API_ENDPOINT,
	responseType: 'json',
	headers: {
		"Content-type": "application/json"
	}
})
