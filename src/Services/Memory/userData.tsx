export const userToken = (): string | undefined => {
  const storageToken = localStorage.getItem("token") || null;
  const parserToken: { token?: { token?: string } } = storageToken ? JSON.parse(storageToken) : {};
  return parserToken?.token?.token;
};

export const userId = (): string | undefined => {
  const storageToken = localStorage.getItem("token") || null;
  const parserToken: { token?: { id?: string } } = storageToken ? JSON.parse(storageToken) : {};
  return parserToken?.token?.id;
};

export const userName = (): string | undefined => {
  const storageToken = localStorage.getItem("token") || null;
  const parserToken: { token?: { username?: string } } = storageToken ? JSON.parse(storageToken) : {};
  return parserToken?.token?.username;
};
