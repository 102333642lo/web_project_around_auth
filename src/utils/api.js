class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }

            return res.json();
        });
    }

   getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers,
  }).then(async (res) => {
    if (!res.ok) {
      const message = await res.text();
      console.error("Respuesta del servidor:", res.status, message);
      throw new Error(`Error: ${res.status}`);
    }

    return res.json();
  });
}

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }

            return res.json();
        });
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }

            return res.json();
        });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }

            return res.json();
        });
    }

    deleteLikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }

            return res.json();
        });
    }
    

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }

            return res.json();
        });
    }

    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }

            return res.json();
        });
    }
}

const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "a00137cd-2bb8-45d9-8e68-e1ad963e9dd8",
        "Content-Type": "application/json",
    },
});

export default api;