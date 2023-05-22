<script lang="ts">
	import { PUBLIC_REMOTE_IMGS_FOLDER } from "$env/static/public";
	import type iProduct from "$lib/models/product";
	import { createLoadObserver } from "$lib/scripts/loadObserverFactory";
	import cartStore from "$lib/stores/cart";
	import loggedIn from "$lib/stores/login";
	import { fade } from "svelte/transition";

	export let product: iProduct;

	let loaded = false;

	const onload = createLoadObserver(() => {
		loaded = true;
	});

	function addToCart(id: string) {
		$cartStore = [...$cartStore, id];
		localStorage.setItem("cart", $cartStore.join("&"));
	}
</script>

<a in:fade href="/products/{product.id}">
	<div class="card">
		<div class="img-wrapper" class:loading={!loaded}>
			<img
				src={PUBLIC_REMOTE_IMGS_FOLDER + "small/" + product.imgs}
				width="168"
				alt={product.title}
				loading="lazy"
				use:onload
			/>
		</div>
		<div class="description">
			<h3>
				{product.title.length > 30
					? product.title.substring(0, 30) + "..."
					: product.title}
			</h3>
			<span class="price">{product.price}₽</span>
			<span class="ccal">{product.ccal}ккал</span>
		</div>
		{#if $loggedIn}
			<div
				class="add-to-cart"
				on:click|stopPropagation|preventDefault={() =>
					addToCart(product.id.toString())}
			>
				<span>+</span>
			</div>
		{/if}
	</div>
</a>

<style lang="scss">
	div.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		position: relative;
		overflow: clip;

		&:hover {
			div.img-wrapper {
				box-shadow: 0px 0.21vw 0px white;
				border-color: white;
			}

			div.add-to-cart {
				top: 0;
			}
		}

		div.add-to-cart {
			position: absolute;
			top: -1.35vw;
			left: 0;
			background-color: var(--primary-color);
			width: 100%;
			transition: 0.3s ease;

			&:hover {
				background-color: var(--darken-primary-color);
			}

			span {
				padding: 0.2vw 0;
				color: white;
				display: block;
				width: 100%;
				text-align: center;
				font-weight: 700;
			}
		}

		div.img-wrapper {
			height: 8.75vw;
			border: 0.1vw var(--primary-color) solid;
			overflow: clip;
			box-sizing: border-box;
			transition: box-shadow 0.3s ease;
			position: relative;

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

		img {
			width: 8.75vw;
		}

		div.description {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr 1.04vw;
			grid-template-areas: "h3 h3" "price ccal";
			row-gap: 0.42vw;

			h3 {
				grid-area: h3;
				margin: 0;
			}

			span {
				color: var(--second-color);
				align-self: flex-end;
			}

			.price {
				font-weight: 700;
			}

			.ccal {
				text-align: right;
				font-size: var(--s-font-size);
				padding-bottom: 0.05vw;
			}
		}
	}
</style>
