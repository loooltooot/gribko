<script>
	import { page } from "$app/stores";
	import "../lib/styles/normalize.css";
	import "../lib/styles/style.scss";
	import Footer from "../lib/components/Footer.svelte";
	import Header from "../lib/components/Header.svelte";
</script>

{#if !$page.error}
	<Header />
{/if}
<main>
	<slot />
</main>
{#if !$page.error}
	<Footer />
{/if}

<style>
</style>
