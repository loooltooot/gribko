<script lang="ts">
	import { PUBLIC_REMOTE_IMGS_FOLDER } from "$env/static/public";
	import type iProduct from "$lib/models/product.js";
	import api from "$lib/scripts/api.js";
	import { createLoadObserver } from "$lib/scripts/loadObserverFactory.js";
	import cartStore from "$lib/stores/cart.js";
	import loggedIn from "$lib/stores/login.js";
	import { onMount } from "svelte";

	export let data;

	let product: iProduct;

	onMount(async () => {
		const response = await api.get(`/products/${data.id}`);
		product = response.data;
	});

	let loaded = false;

	const onload = createLoadObserver(() => {
		loaded = true;
	});

	function addToCart(id: string) {
		$cartStore = [...$cartStore, id];
		localStorage.setItem("cart", $cartStore.join("&"));
	}
</script>

<section>
	{#if product}
		<div class="card">
			<div class="image-wrapper" class:loading={!loaded}>
				<img
					src={PUBLIC_REMOTE_IMGS_FOLDER + "big/" + product.imgs}
					alt={product.title}
					width="300"
					use:onload
				/>
			</div>
			<div class="content">
				<header>
					<h2>{product.title}</h2>
					<span class="price">{product.price}₽</span>
					<span class="ccal">{product.ccal}ккал</span>
				</header>
				<p>{product.description}</p>
				<span class="amount">0.5л</span>
				{#if $loggedIn}
					<button
						class="focused-button"
						on:click|stopPropagation|preventDefault={() =>
							addToCart(product.id.toString())}
						>Добавить в корзину</button
					>
				{/if}
			</div>
		</div>
	{:else}
		<div class="card">
			<div class="image-skeleton" />
			<div class="content">
				<h2 class="skeleton" />
				<span class="skeleton" />
			</div>
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		margin-bottom: 5.21vw;
		margin-top: 3vw;

		div.card {
			display: flex;
			justify-content: space-between;
			column-gap: 2vw;

			img {
				width: 15.63vw;
			}

			div.image-wrapper {
				width: 15.63vw;
				height: 19.53vw;
				position: relative;
				overflow: clip;

				@keyframes spinning {
					from {
						transform: rotate(0deg);
					}

					to {
						transform: rotate(360deg);
					}
				}

				&.loading::after {
					content: "";
					width: 200%;
					height: 200%;
					position: absolute;
					background: linear-gradient(
						225deg,
						var(--second-color) 0%,
						var(--primary-color) 60%
					);
					left: -50%;
					top: -50%;
					animation: spinning 3s ease forwards infinite alternate;
				}
			}

			div.content {
				header {
					h2 {
						margin: 0 0 0.21vw;
					}

					span.price {
						margin-right: 0.21vw;
					}
				}

				button {
					margin-top: 4vw;
				}

				span.amount {
					display: block;
				}
			}

			@keyframes skewLoader {
				from {
					transform: scaleX(1);
				}

				to {
					transform: scaleX(0.95);
				}
			}

			.image-skeleton,
			.skeleton {
				background: linear-gradient(
					225deg,
					var(--second-color) 0%,
					var(--primary-color) 60%
				);
				animation: skewLoader 1s ease infinite forwards alternate;
			}

			.image-skeleton {
				width: 15.63vw;
				height: 19.53vw;
			}

			.skeleton {
				width: 20vw;
				height: 1.56vw;
				display: block;
			}

			h2.skeleton {
				margin-top: 0;
			}
		}
	}
</style>
