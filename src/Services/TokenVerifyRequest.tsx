import API_BASE_URL from "./api";
import axios from "axios";

const axiosConfig = (token: string) => ({
  headers: {
    "content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${token}`,
  },
});

export const TokenVerify = async (token: string): Promise<unknown> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, axiosConfig(token));

    if (!response.status === 200) {
      throw new Error(`Token verification failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred.");
  }
};
