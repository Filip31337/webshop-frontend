export async function getTokenFromLocalStorage() {
    try {
        const response: string = localStorage.getItem("token");
        if (response && response.length > 1) {
            return response;
        }
        return "";
    } catch (e) {
        console.error(e);
    }
}

export async function isUserLoggedIn() {
    try {
        const response: string = localStorage.getItem("token");
        if (response && response.length > 1) {
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
    }
}

export async function resetLocalStorageToken() {
    try {
        localStorage.removeItem("token");
    } catch (e) {
        console.error(e);
    }
}