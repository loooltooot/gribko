<script>
	import { draw } from "svelte/transition";
	import { cubicIn } from "svelte/easing";
	import { onMount } from "svelte";

	let duration = 1000;

	let mounted = false;

	onMount(() => (mounted = true));
</script>

<a href="/">
	<svg
		width="64"
		height="52"
		viewBox="0 0 64 52"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#if mounted}
			<path
				transition:draw={{ duration: 2000 }}
				d="M24.0927 51.5272V26.5538H7C7 26.5538 10.5144 6 32.0266 6"
				stroke="#3BD055"
				stroke-width="10.6496"
				stroke-miterlimit="10"
			/>
			<path
				transition:draw={{ duration: 2000 }}
				d="M39.9073 51.5272V26.5538H57C57 26.5538 53.5389 6 32.0266 6"
				stroke="#3BD055"
				stroke-width="10.6496"
				stroke-miterlimit="10"
			/>
		{/if}
	</svg>
</a>

<style lang="scss">
	svg {
		cursor: pointer;

		path {
			transition: stroke 0.3s ease;
		}

		&:hover path {
			stroke: white;
		}
	}
</style>
