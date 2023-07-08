export const TokenVerify = async (token: string): Promise<Response> => {
  try {
    const res: Response = await fetch("/api/verify", {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log(res.status);
      throw new Error(`Token verification failed: ${res.status}`);
    }

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred.");
  }
};
