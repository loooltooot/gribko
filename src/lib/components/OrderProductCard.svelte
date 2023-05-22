<script lang="ts">
	import { PUBLIC_REMOTE_IMGS_FOLDER } from "$env/static/public";
	import type iProduct from "$lib/models/product";
	import { createLoadObserver } from "$lib/scripts/loadObserverFactory";
	import cartStore from "$lib/stores/cart";
	import { fade } from "svelte/transition";

	export let amount: number;
	export let product: iProduct;
	export let deleteFromCart: Function;

	let loaded = false;

	const onload = createLoadObserver(() => {
		loaded = true;
	});
</script>

<div class="cart-card">
	<a in:fade href="/products/{product.id}" title={product.title}>
		<div class="image-wrapper" class:loading={!loaded}>
			<img
				src={PUBLIC_REMOTE_IMGS_FOLDER + "big/" + product.imgs}
				width="200"
				alt={product.title}
				loading="lazy"
				use:onload
			/>
		</div>
	</a>
	<div class="content">
		<div class="header">
			<h3>{product.title}</h3>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				on:click={() => deleteFromCart(product)}
			>
				<path
					d="M1.41426 0L15.5564 14.1421L14.1422 15.5563L4.55379e-05 1.41421L1.41426 0Z"
					fill="white"
				/>
				<path
					d="M15.5563 1.41422L1.41421 15.5564L0 14.1421L14.1421 1.54972e-06L15.5563 1.41422Z"
					fill="white"
				/>
			</svg>
		</div>
		<div class="price-amount">
			<span class="amount">{amount}x</span>
			<span class="price"
				>{product.price}₽ x {amount} =
				<span class="price-calc">{product.price * amount}₽</span></span
			>
		</div>
		<p>
			{product.description}
		</p>
		<span class="ccal">{product.ccal}ккал</span>
	</div>
</div>

<style lang="scss">
	h3 {
		font-size: 1.25em;
		margin-bottom: 0.11vw;
		margin-top: 0.52vw;
	}

	div.cart-card {
		display: flex;
		justify-content: space-between;

		div.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			svg {
				width: 0.83vw;
				height: 0.83vw;

				path {
					transition: fill 0.3s ease;
				}

				&:hover path {
					fill: red;
				}
			}
		}

		div.content {
			flex-grow: 1;
			border-bottom: 0.11vw var(--primary-color) solid;
			border-right: 0.11vw var(--primary-color) solid;
			border-top: 0.11vw var(--primary-color) solid;
			padding-left: 0.83vw;
			padding-right: 0.83vw;

			span.price {
				font-weight: 300;
			}

			span.amount,
			span.price-calc {
				color: var(--second-color);
				font-weight: 700;
			}

			span.ccal {
				font-size: var(--s-font-size);
			}
		}
	}

	div.image-wrapper {
		width: 10.42vw;
		height: 10.42vw;
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
</style>
