import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

let cartStore: Writable<Array<string>> = writable([])

if (browser) {
    const sessionCart = sessionStorage.getItem('cart')?.split('&') || []
    cartStore = writable(sessionCart)
}

export default cartStore