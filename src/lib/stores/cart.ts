import { browser } from "$app/environment";
import type iProduct from "$lib/models/product";
import { writable, type Writable } from "svelte/store";

let cartStore: Writable<Array<string>> = writable([])

if (browser) {
    const localCart = localStorage.getItem('cart')?.split('&') || []
    cartStore = writable(localCart)
}

export default cartStore