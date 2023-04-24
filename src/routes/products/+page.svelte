<script lang="ts">
	import { onMount } from "svelte";
	import api from "$lib/scripts/api.js";
	import type iProduct from "$lib/models/product";
	import productsStore from "$lib/stores/products";
	import ProductCard from "$lib/components/ProductCard.svelte";
	import Suprise from "$lib/components/Suprise.svelte";

	let products: Array<iProduct> = [];
	let searchQuery: String;

	$: searchedProducts = searchQuery
		? products.filter((product) =>
				product.title.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: products;

	onMount(async () => {
		if ($productsStore.length === 0) {
			const response = await api.get("/products");
			products = response.data;
			productsStore.set(products);
		} else {
			products = $productsStore;
		}

		document.title = "Товары";
	});
</script>

<section>
	<Suprise />
	<header>
		<h2>Товары:</h2>
		<input type="text" bind:value={searchQuery} placeholder="поиск..." />
	</header>
	<ul>
		{#each searchedProducts as product (product.id)}
			<li>
				<ProductCard {product} />
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		padding: 0;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 3.49vw;
		margin-bottom: 1vw;
		padding: var(--text-container-padding);

		input[type="text"] {
			height: 1.56vw;
			border: 0.1vw var(--primary-color) solid;
			background: none;
			padding: 0 0.5vw;
		}
	}

	h2 {
		margin: 0;
	}
	ul {
		display: grid;
		grid-template-columns: repeat(4, 8.75vw);
		column-gap: 1.35vw;
		row-gap: 0.94vw;
		margin-bottom: 5.21vw;
		padding: var(--text-container-padding);

		li {
			width: 8.75vw;
			height: 12.55vw;
		}
	}
</style>
