<script lang="ts">
	import { PUBLIC_REMOTE_IMGS_FOLDER } from "$env/static/public";
	import type iProduct from "$lib/models/product";
	import { createLoadObserver } from "$lib/scripts/loadObserverFactory";
	import { fade } from "svelte/transition";

	export let amount: number;
	export let product: iProduct;

	let loaded = false;

	const onload = createLoadObserver(() => {
		loaded = true;
	});
</script>

<div class="cart-card">
	<div class="image-wrapper" class:loading={!loaded}>
		<img
			src={PUBLIC_REMOTE_IMGS_FOLDER + "big/" + product.imgs}
			width="200"
			alt="здесь могла быть картинка"
			loading="lazy"
			use:onload
		/>
	</div>
	<div class="content">
		<div class="header">
			<h3>{product.title}</h3>
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
	div.cart-card {
		display: flex;
		justify-content: space-between;

		div.content {
			flex-grow: 1;
			border-bottom: 0.11vw var(--primary-color) solid;
			border-right: 0.11vw var(--primary-color) solid;
			border-top: 0.11vw var(--primary-color) solid;
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
