import { CredentialsTypes } from "../Types/CredentialsTypes";
import Cookies from "js-cookie";
import API from "./api"; 

interface Token {
  token: string;
}


export async function signup(credentials: CredentialsTypes) {
  try {
    const response = await API.post("/signup", credentials);

    if (response.status !== 200) throw new Error();
    const token: Token = response.data;
    Cookies.set("token", JSON.stringify(token), {
      secure: true,
    });

    return token;
  } catch (error) {
    throw error;
  }
}

export async function login(credentials: CredentialsTypes) {
  try {
    const response = await API.post("/login", credentials); // Use API.post() instead of axios.post()

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
    }); // Use API.delete() instead of axios.delete()
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: string, newpass: any): Promise<void> => {
  try {
    await API.post("/reset_password", {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
        'newpassword':newpass,
      },
    });
  } catch (error) {
    throw error;
  }
};
