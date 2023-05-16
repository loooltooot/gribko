import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

let loggedIn: Writable<boolean> = writable(false)

if (browser) {
    const sessionAuthToken = sessionStorage.getItem('authToken') !== null
    loggedIn = writable(sessionAuthToken)
}

export default loggedIn