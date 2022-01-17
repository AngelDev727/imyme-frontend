export const ACCESS_TOKEN_KEY = 'imyme-token'

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export function isLoggedIn() {
    const accessToken = getAccessToken()
    return !!accessToken
}

export function hasToken() {
    const accessToken = getAccessToken()
    return !!accessToken
}
