const axios = require('axios')
const qs = require('qs')
const config = require('./config.js')

var api = axios.create(config)

api.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})
const getHeader = () => {
  var headers = {}
  // if (store.state.global.token) {
  //   headers['X-Auth-Token'] = store.state.global.token
  // }
  return headers
}
module.exports = {
  put (url, params) {
    return api({
      method: 'put',
      url,
      data: params,
      headers: getHeader()
    })
  },
  delete (url, params) {
    return api({
      method: 'delete',
      url,
      data: params,
      headers: getHeader()
    })
  },
  post (url, params) {
    // if (store.state.global.token) {
    //   params['UserToken'] = store.state.global.token
    // }
    var headers = getHeader()
    headers['Content-Type'] = 'application/json; charset=UTF-8'
    return api({
      method: 'post',
      url,
      data: params,
      headers
    })
  },
  download (url, params, fileName) {
    return api({
      method: 'get',
      url,
      params,
      responseType: 'blob'
    }).then(result => {
      // window.open(URL.createObjectURL(result))
      var a = document.createElement('a')
      a.href = URL.createObjectURL(result)
      a.download = fileName
      a.click()
    })
  },
  postForm (url, params) {
    var headers = getHeader()
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    return api({
      method: 'post',
      url,
      data: qs.stringify(params),
      headers
    })
  },
  get (url, params) {
    return api({
      method: 'get',
      url,
      params,
      headers: getHeader()
    })
  }
}
