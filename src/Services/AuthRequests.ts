import { CredentialsTypes } from "../Types/CredentialsTypes";
import Cookies from "js-cookie";
import API from "./api";
import axios from "axios";

interface Token {
  token: string;
}
export async function signup(credentials: CredentialsTypes) {
  try {
    const response = await API.post("/signup", credentials);

    if (response.status !== 200) {
      const errorData = response.data;
      if (errorData && !errorData.success) {
        const errorMessages = errorData.messages;
        console.error(errorMessages); 
      }
      throw new Error('Network response was not ok');
    }

    const token: Token = response.data;
    Cookies.set("token", JSON.stringify(token), {
      secure: true,
    });

    return token;
  } catch (error) {
    console.error('An error occurred:', error.response.data.messages);
    throw error.response.data.messages;
  }
}

export async function login(credentials: CredentialsTypes) {
  try {
    const response = await API.post("/login", credentials);

    if (response.status === 404) {
      throw new Error("Account not found");
    } else if (response.status === 401) {
      throw new Error("Invalid password");
    } else if (response.status !== 200) {
      throw new Error("Unknown error");
    }

    const token: Token = response.data;
    Cookies.set("token", JSON.stringify(token), {
      secure: true,
    });

    return token;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await API.post("/logout");
    if (response.status !== 200) throw new Error();
    const token: Token = response.data;

    return token;
  } catch (error) {
    throw error;
  }
}

export const deleteAccount = async (id: number, token: any): Promise<void> => {
  try {
    await API.delete(`/delete_account/${id}`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  token: string,
  newpass: any
): Promise<void> => {
  try {
    await API.post("/reset_password", {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
        newpassword: newpass,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: any): Promise<void> => {
  try {
    await API.post("/forgot_password", {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        email: email,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const resetUserPassword = async (
  token: any,
  newpass: any,
  id: number
): Promise<void> => {
  try {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 5000,
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
        newpassword: newpass,
        user_id: id,
      },
    });
    await axiosInstance.post("/resetuserpassword");
  } catch (error) {
    throw error;
  }
};
