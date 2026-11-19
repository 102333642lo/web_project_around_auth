const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = (email, password) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => Promise.reject(error));
    }
    return res.json();
  });

export const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => Promise.reject(error));
    }
    return res.json();
  });

export const getUserInfo = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => Promise.reject(error));
    }
    return res.json();
  });
