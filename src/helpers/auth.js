const apiURL = process.env.REACT_APP_API_URL;

export function saveJWT(data) {
    localStorage.setItem('token', JSON.stringify(data))
}

export function removeJWT() {
    localStorage.removeItem('token');
}

export function getJWT() {
    const token = localStorage.getItem('token');
    if (!token) {

    }

    return JSON.parse(token).jwt;
}


export function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    return true;
}


export function loginRequest(data) {
    return request(data, 'login');
}

export function registerRequest(data) {
    return request(data, 'register');
}


function request(data, type) {


    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    let url;
    if (type === "login") {

        url = `${apiURL}/user/sign-in`;
    }
    else if (type === "register") {
        url = `${apiURL}/user`;
    }

    return fetch(url, config)
        .then((response) => response.json())
        .then((result) => {
            if (result.error) {
                throw result.error;
            }
            return result;
        });

}