import axios from "axios";
import { API_KEY, API_URL } from "../constants";

export const fetchPageData = async (page) => {
    try {
        const response = await axios.get(`${API_URL}&page=${page}`, {
            headers: {
                "x-api-key": API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};