export const getUserId = () => {
    return sessionStorage.getItem("user_id") || false
}

export const userLoggedIn = () => {
    if (getUserId() === false) {
        return false
    } else {
        return true
    }
}