<script lang="ts">
	import { onMount } from "svelte";
	import api from "$lib/scripts/api.js";
	import type iProduct from "$lib/models/product";
	import productsStore from "$lib/stores/products";
	import ProductCard from "$lib/components/ProductCard.svelte";
	import Suprise from "$lib/components/Suprise.svelte";

	let products: Array<iProduct> = [];
	let searchQuery: String;
	let sortType: string;
	let desc: boolean = false;

	$: searchedProducts = searchQuery
		? products.filter((product) =>
				product.title.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: products;

	$: sortedProducts = sortType ? sortProducts(desc) : searchedProducts;

	function sortProducts(desc: boolean): iProduct[] {
		return desc
			? searchedProducts.sort((a, b) => +b[sortType] - +a[sortType])
			: searchedProducts.sort((a, b) => +a[sortType] - +b[sortType]);
	}

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
		<div id="filters">
			<label>
				цена
				<input type="radio" bind:group={sortType} value="price" />
			</label>
			<label>
				ккал
				<input type="radio" bind:group={sortType} value="ccal" />
			</label>
			<label>
				по убыванию
				<input type="checkbox" bind:checked={desc} />
			</label>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="поиск..."
			/>
		</div>
	</header>
	{#if sortedProducts.length !== 0}
		<ul>
			{#each sortedProducts as product (product.id)}
				<li>
					<ProductCard {product} />
				</li>
			{/each}
		</ul>
	{:else}
		<div class="loader">
			{searchQuery ? "Скоро добавим" : "Загрузка..."}
		</div>
	{/if}
</section>

<style lang="scss">
	@keyframes skewLoader {
		from {
			transform: scaleX(1);
		}

		to {
			transform: scaleX(0.9);
		}
	}
	div.loader {
		width: 100%;
		background-color: var(--second-color);
		padding: var(--text-container-padding);
		padding-top: 1vw;
		padding-bottom: 1vw;
		box-sizing: border-box;
		color: #000;
		animation: skewLoader 1s ease infinite forwards alternate;
	}
	section {
		padding: 0;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 3.49vw;
		padding: var(--text-container-padding);

		div#filters {
			display: flex;
			column-gap: 1vw;
			align-items: center;

			input:not([type="text"]) {
				accent-color: var(--second-color);
			}

			input[type="text"] {
				height: 1.56vw;
				border: 0.1vw var(--primary-color) solid;
				background: none;
				padding: 0 0.5vw;
			}
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
