const TOKEN_KEY = "jwt";

// Guardar el token
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Obtener el token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Eliminar el token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
