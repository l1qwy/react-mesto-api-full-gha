class Api {
  constructor(config) {
    this._url = config.baseUrl;
  }

  _verifyRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject;
    }
  }

  getUserInfoFromSrv(token) {
    return fetch(this._url + "users/me", {
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._verifyRes);
  }

  getServerCards(token) {
    return fetch(this._url + "cards", {
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._verifyRes);
  }

  setUserInfoToSrv(data, token) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.nameProfile,
        about: data.jobProfile,
      }),
    }).then(this._verifyRes);
  }

  changeAvatar(data, token) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatarProfile,
      }),
    }).then(this._verifyRes);
  }

  addCardToSrv(data, token) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._verifyRes);
  }

  deleteCardFromSrv(cardId, token) {
    return fetch(this._url + "cards/" + cardId, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._verifyRes);
  }

  activeLike(cardId, token) {
    return fetch(this._url + "cards/" + cardId + "/likes", {
      method: "PUT",
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._verifyRes);
  }

  unactiveLike(cardId, token) {
    return fetch(this._url + "cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._verifyRes);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000"
});

export default api;
