
  
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
    const baseURL = 'http://192.168.1.93:8089'
    const opt = options || {}
    const URL = baseURL + url
    return new Promise((resolve, reject) => {
        opt.method = opt.method || 'get'
        fetch(URL, {
            credentials: 'include',
            cache: "force-cache",
            ...opt
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}