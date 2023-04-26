import { writable, type Writable } from "svelte/store";

const loggedIn: Writable<boolean> = writable(false)

export default loggedIn