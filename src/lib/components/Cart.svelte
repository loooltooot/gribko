<script lang="ts">
	import loggedIn from "$lib/stores/login";
	import cartStore from "$lib/stores/cart";
</script>

<a href="/cart">
	<svg
		width="50"
		height="40"
		viewBox="0 0 50 40"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			id="cart-path"
			d="M45.1589 20.7436L42.4931 39.4043L7.67754 39.7509L4.69183 21.5754L0.0693117 17.4807L0 14.2497L50 14.1804L49.6908 18.2431L45.1589 20.7436ZM17.9996 23.7773C17.9996 20.3704 13.5583 20.3864 13.5797 23.564C13.5797 24.5397 13.6383 32.6598 13.649 33.5555C13.649 36.6265 18.0262 36.5306 18.0049 33.3209C17.9996 32.4572 18.0102 24.9076 17.9996 23.7773ZM27.2713 23.7773C27.2713 20.3704 22.83 20.3864 22.8514 23.564C22.8514 24.5397 22.91 32.6598 22.9207 33.5555C22.9207 36.6265 27.2979 36.5306 27.2766 33.3209C27.2713 32.4572 27.2819 24.9076 27.2713 23.7773ZM36.543 23.7773C36.543 20.3704 32.1017 20.3864 32.1231 23.564C32.1231 24.5397 32.1817 32.6598 32.1924 33.5555C32.1924 36.6265 36.5696 36.5306 36.5483 33.3209C36.543 32.4572 36.5536 24.9076 36.543 23.7773ZM27.122 4.40751C24.6055 1.91764 27.9217 -1.54258 30.353 0.851317L41.0162 11.4026L34.0851 11.3919L27.122 4.40751ZM15.595 11.4186H8.73854C11.6336 8.5182 18.6927 1.47512 19.2578 0.8993C21.737 -1.61723 25.2079 1.69904 22.8354 4.09828L15.595 11.4186Z"
			fill="white"
		/>
	</svg>
	{#if $loggedIn && $cartStore.length !== 0}
		<span class="stored-amount">{$cartStore.length}</span>
	{/if}
</a>

<style lang="scss">
	a {
		position: relative;
	}

	svg {
		cursor: pointer;

		path {
			transition: 0.3s ease;
		}

		&:hover path {
			fill: var(--primary-color);
		}
	}

	.stored-amount {
		position: absolute;
		right: -0.21vw;
		top: 0;
		display: block;
		border-radius: 1.56vw;
		background-color: red;
		padding: 0.1vw 0.3vw;
		pointer-events: none;
	}
</style>
