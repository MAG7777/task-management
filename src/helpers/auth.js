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