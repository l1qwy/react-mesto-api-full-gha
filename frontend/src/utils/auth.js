const baseUrl = "http://localhost:3000";

function getResponseData(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`${res.status} ${res.statusText}`);
}

export function registration(password, email) {
  return fetch(`${baseUrl}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => getResponseData(res));
}

export function autorization(password, email) {
  return fetch(`${baseUrl}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => getResponseData(res));
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  }).then((res) => getResponseData(res));
}
