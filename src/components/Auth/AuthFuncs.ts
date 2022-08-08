export const getUserId = () => {
    return sessionStorage.getItem("user_id") || false
}