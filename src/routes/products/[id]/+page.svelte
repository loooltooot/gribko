<script lang="ts">
	import { PUBLIC_REMOTE_IMGS_FOLDER } from "$env/static/public";
	import type iProduct from "$lib/models/product.js";
	import api from "$lib/scripts/api.js";
	import { onMount } from "svelte";

	export let data;

	let product: iProduct;

	onMount(async () => {
		const response = await api.get(`/products/${data.id}`);
		product = response.data;
	});
</script>

<section>
	{#if product}
		<div class="card">
			<img
				src={PUBLIC_REMOTE_IMGS_FOLDER + "big/" + product.imgs}
				alt={product.title}
			/>
		</div>
	{/if}
</section>
