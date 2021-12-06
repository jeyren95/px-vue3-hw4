export const registerUser = (form) => fetch(`https://ecomm-service.herokuapp.com/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(form)
  })
  .then((res) => res.json())


export const loginUser = (form) => fetch(`https://ecomm-service.herokuapp.com/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  })
  .then((res) => res.json())


export const getCurrentUser = (accessToken) => fetch(`https://ecomm-service.herokuapp.com/whoami`, {
    headers: {
      accept: "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then((res) => res.json())


