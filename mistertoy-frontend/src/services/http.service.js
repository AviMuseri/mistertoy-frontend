import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  }
}

function ajax(endpoint, method = 'GET', data = null) {
  return axios({
    url: `${BASE_URL}${endpoint}`,
    method,
    data,
    params: (method === 'GET') ? data : null
  })
    .then(res => res.data)
    .catch(err => {
      console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
      console.dir(err)
      if (err.response && err.response.status === 401) {
        sessionStorage.clear()
        window.location.assign('/')
      }
      throw err
    })
}
