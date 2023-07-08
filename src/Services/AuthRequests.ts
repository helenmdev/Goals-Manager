import { CredentialsTypes } from "../Types/CredentialsTypes";
import Cookies from "js-cookie";

interface Token {
  token: string;
}

export async function signup(credentials: CredentialsTypes) {
  const response = await fetch(`/api/signup`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.status !== 200) throw new Error();
  const token: Token = await response.json();
  Cookies.set("token", JSON.stringify(token), {
    secure: true,
  });

  return token;
}

export async function login(credentials: CredentialsTypes) {
  try {
    const response = await fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status === 404) {
      throw new Error("Account not found");
    } else if (response.status === 401) {
      throw new Error("Invalid password");
    } else if (response.status !== 200) {
      throw new Error("Unknown error");
    }

    const token: Token = await response.json();

    return token;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  const response = await fetch(`/api/logout`, {
    method: "POST",
  });
  if (response.status !== 200) throw new Error();
  const token: Token = await response.json();

  return token;
}

export const deleteAccount = async (id: number, token: any): Promise<void> => {
  await fetch(`/api/delete_account/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
};
