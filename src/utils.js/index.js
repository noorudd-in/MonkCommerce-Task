import axios from "axios";
import { API_KEY, API_URL } from "../constants";

export const fetchPageData = async (page, query) => {
    try {
        const response = await axios.get(`${API_URL}&page=${page}&search=${query}`, {
            headers: {
                "x-api-key": API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchSearchData = async (query, page) => {
    try {
        const response = await axios.get(`${API_URL}`)
    } catch (error) {
        console.log(error)
    }
}