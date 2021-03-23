export function setPassword(password) {
    return { type: 'SET_PASSWORD', payload: password }
}
export function setName(name) {
    return { type: 'SET_NAME', payload: name }
}
export function setEmail(email) {
    return { type: 'SET_EMAIL', payload: email }
}
export function setToken(token) {
    return { type: 'SET_TOKEN', payload: token }
}
export function setDrinks(drink) {
    return { type: 'SET_DRINKS', payload: drink }
}