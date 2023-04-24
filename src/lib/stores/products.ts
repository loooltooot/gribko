import type iProduct from "$lib/models/product";
import { writable, type Writable } from "svelte/store";

const productsStore: Writable<Array<iProduct>> = writable([])

export default productsStore