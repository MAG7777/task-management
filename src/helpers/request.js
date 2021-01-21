function request(url, method = "GET", body) {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  
  return fetch(url, config)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        throw result.error;
      }
      // If we return something inside  this then,
      // we well be able to accept it inside next then
      return result;
    });
    
}

export default request;
