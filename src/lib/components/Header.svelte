<script lang="ts">
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import Cart from "./Cart.svelte";
	import Logo from "./Logo.svelte";
	import Auth from "./Auth.svelte";
	import loggedIn from "$lib/stores/login";

	const paths = [
		{ href: "/products", text: "товары", hovered: false, darked: false },
		{ href: "/stores", text: "магазины", hovered: false, darked: false },
		{ href: "/shipping", text: "доставка", hovered: false, darked: false },
		{
			href: "/factory",
			text: "производство",
			hovered: false,
			darked: false,
		},
		{ href: "/franchise", text: "франшиза", hovered: false, darked: false },
	];

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<header transition:slide={{ duration: 500 }}>
		<Logo />
		<nav>
			<ul>
				{#each paths as path (path.href)}
					<li
						on:mouseleave={() => {
							path.hovered = false;
							paths.forEach((p) => (p.darked = false));
						}}
						on:mouseover={() => {
							path.hovered = true;
							paths.forEach((p) => {
								if (!p.hovered) p.darked = true;
							});
						}}
						class:hovered={path.hovered}
						class:darked={path.darked}
						on:focus={() => {}}
					>
						<a href={path.href}>{path.text}</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="cart-auth">
			{#if $loggedIn}
				<Cart />
			{/if}
			<Auth />
		</div>
	</header>
{/if}

<style lang="scss">
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		padding: 0.6vw 10.42vw;
		box-sizing: border-box;
		align-items: center;
		background-color: rgba($color: #000000, $alpha: 0.7);
		backdrop-filter: blur(0.5vw);
		z-index: 10;

		nav ul {
			justify-content: space-between;
			column-gap: 2.08vw;

			a {
				transition: color 0.3s ease, text-shadow 0.3s ease;
				font-weight: 700;
			}

			.hovered a {
				color: var(--primary-color);
				text-shadow: 0px 1px 0px #ffffff;
			}

			.darked a {
				color: #5f5f5f;
			}
		}

		div.cart-auth {
			display: flex;
			align-items: center;
			column-gap: 0.5vw;
		}
	}
</style>
