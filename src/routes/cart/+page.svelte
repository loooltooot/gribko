<script lang="ts">
	import OrderProductCard from "$lib/components/OrderProductCard.svelte";
	import productsStore from "$lib/stores/products";
	import cartStore from "$lib/stores/cart";
	import type iCartProduct from "$lib/models/cartProduct";
	import type iProduct from "$lib/models/product";
	import { onMount } from "svelte";
	import loggedIn from "$lib/stores/login";
	import { browser } from "$app/environment";
	import api from "$lib/scripts/api";

	$: if (!$loggedIn) {
		if (browser) {
			window.location.href = "/";
		}
	}

	let cartedProducts: Array<iCartProduct> = [];
	let indexedProductsIds: Array<number> = [];
	let isLoaded = $productsStore.length !== 0;
	let loadedProducts: Array<iProduct> = [];

	const defaultProduct: iProduct = {
		id: -1,
		title: "string",
		description: "string",
		ccal: 0,
		price: 0,
		imgs: "string",
	};

	$cartStore.forEach((id) => {
		if (!indexedProductsIds.includes(+id)) {
			indexedProductsIds.push(+id);
			cartedProducts.push({
				id: +id,
				product:
					$productsStore.find((item) => {
						return item.id === +id;
					}) || defaultProduct,
				amount: 1,
			});
		} else {
			cartedProducts.forEach((orderCart) => {
				if (orderCart.id === +id) orderCart.amount += 1;
			});
		}
	});

	$: sortedCart = cartedProducts
		.map((item) => {
			item.product =
				loadedProducts.find((product) => {
					return product.id === item.id;
				}) || defaultProduct;
			return item;
		})
		.sort(
			(a, b) => b.product.price * b.amount - a.product.price * a.amount
		);

	$: sum = sortedCart.reduce(
		(prev, item) => prev + item.product.price * item.amount,
		0
	);

	onMount(async () => {
		if ($productsStore.length === 0) {
			const response = await api
				.get(`/products/spec/${indexedProductsIds.join(",")}`)
				.then((response) => {
					isLoaded = true;
					return response;
				});
			loadedProducts = response.data;
		} else {
			loadedProducts = $productsStore;
		}
		document.title = "Корзина";
	});

	function deleteFromCart(product: iProduct) {
		let temp = [...$cartStore];

		temp.splice(temp.indexOf(product.id.toString()), 1);

		cartStore.set(temp);
		localStorage.setItem("cart", $cartStore.join("&"));

		cartedProducts.forEach((item) => {
			if (item.id === product.id) {
				item.amount -= 1;
			}
		});

		cartedProducts = [...cartedProducts];
	}
</script>

{#if $loggedIn && isLoaded}
	<section>
		<header>
			<h2>Корзина: {sum}₽</h2>
			<a href="/order" class="focused-button">заказать</a>
		</header>
		{#if sortedCart.length !== 0}
			<ul>
				{#each sortedCart as orderCard (orderCard.id)}
					{#if orderCard.amount !== 0}
						<li>
							<OrderProductCard
								amount={orderCard.amount}
								product={orderCard.product}
								{deleteFromCart}
							/>
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</section>
{:else}
	<div class="loader">Загрузка...</div>
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
