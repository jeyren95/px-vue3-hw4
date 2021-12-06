export const fetchComments = (movieId) => fetch(`https://ecomm-service.herokuapp.com/movie/movie/${movieId}/comment`, {
    headers: {
      accept: "application/json"
    }
  })
  .then((res) => res.json())


export const fetchMovie = (movieId) => fetch(`https://ecomm-service.herokuapp.com/movie/movie/${movieId}`, {
    headers: {
      accept: "application/json"
    }
  })
  .then((res) => res.json())


export const fetchMovies = () => fetch(`https://ecomm-service.herokuapp.com/movie?page=1&limit=6`, {
    headers: {
      accept: "application/json"
    }
  })
  .then((res) => res.json())


export const addComment = (accessToken, form) => fetch(`https://ecomm-service.herokuapp.com/movie/comment`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(form)
  })
  .then((res) => res.json())


export const deleteComment = (accessToken, commentId) => fetch(`https://ecomm-service.herokuapp.com/movie/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then((res) => res.json())