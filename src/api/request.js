import axios from 'axios'
  
function checkStatus(response) {
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
function parseJSON(response) {
    return response.json();
}

// get 请求

export const request = function(url, options) {
    const baseURL = 'http://localhost:8089'
    const opt = options || {}
    const URL = baseURL + url
    return new Promise((resolve, reject) => {
        opt.method = opt.method || 'get'
        axios.get(URL)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}