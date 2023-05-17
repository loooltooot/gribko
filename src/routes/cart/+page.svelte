<script lang="ts">
	import OrderProductCard from "$lib/components/OrderProductCard.svelte";
	import productsStore from "$lib/stores/products";
	import cartStore from "$lib/stores/cart";
	import type iCartProduct from "$lib/models/cartProduct";
	import type iProduct from "$lib/models/product";
	import { onMount } from "svelte";
	import loggedIn from "$lib/stores/login";
	import { browser } from "$app/environment";

	$: if (!$loggedIn) {
		if (browser) {
			window.location.href = "/";
		}
	}

	let cartedProducts: Array<iCartProduct> = [];
	let indexedProductsIds: Array<number> = [];

	const defaultProduct: iProduct = {
		id: -1,
		title: "string",
		description: "string",
		ccal: 0,
		price: 0,
		imgs: "string",
	};

	if ($productsStore.length !== 0) {
		$cartStore.forEach((id) => {
			if (!indexedProductsIds.includes(+id)) {
				indexedProductsIds.push(+id);
				cartedProducts.push({
					id: +id,
					product: $productsStore[+id],
					amount: 1,
				});
			} else {
				cartedProducts.forEach((orderCart) => {
					if (orderCart.id === +id) orderCart.amount += 1;
				});
			}
		});
	} else {
		$cartStore.forEach((id) => {
			if (!indexedProductsIds.includes(+id)) {
				indexedProductsIds.push(+id);
				cartedProducts.push({
					id: +id,
					product: defaultProduct,
					amount: 1,
				});
			} else {
				cartedProducts.forEach((orderCart) => {
					if (orderCart.id === +id) orderCart.amount += 1;
				});
			}
		});
	}

	onMount(() => {
		// if ($productsStore.length === 0) {
		// 	const response = await api.get("/products");
		// 	products = response.data;
		// 	productsStore.set(products);
		// } else {
		// 	products = $productsStore;
		// }

		document.title = "Корзина";
	});
</script>

{#if $loggedIn}
	<section>
		<header>
			<h2>Корзина:</h2>
			<a href="/order" class="focused-button">заказать</a>
		</header>
		{#if cartedProducts.length !== 0}
			<ul>
				{#each cartedProducts as orderCart}
					<li>
						<OrderProductCard
							amount={orderCart.amount}
							product={orderCart.product}
						/>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
{/if}

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0;

		a {
			height: fit-content;
			margin-top: 0.2vw;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		row-gap: 0.94vw;
		margin-bottom: 5.21vw;
	}
</style>
