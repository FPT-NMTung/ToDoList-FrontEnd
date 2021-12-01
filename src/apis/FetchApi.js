const SendApi = (uri, method, context, body, callback) => {
  const endpoint_server = process.env.REACT_APP_ENDPOINT_SERVER

  console.log(`${endpoint_server}${uri}`)

  fetch(`${endpoint_server}${uri}`,
    {
      method: method,
      headers: {
        'Content-Type': context,
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.status === 204) {
        callback(false, undefined)
      } else if (response.status === 401) {
        localStorage.clear()
        window.location.reload()
      } else if (response.status === 422) {
        response.json()
          .then((data) => callback(false, data))
      } else if (response.ok) {
        response.json()
          .then((data) => callback(true, data))
      } else {
        callback(false, undefined)
      }
    })
}

export default SendApi