<script>
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div transition:fly={{ y: 200, duration: 1000 }} id="h1-container">
		<h1 class="disable-select">ГрибКо</h1>
		<span class="disable-select">ГрибКо</span>
	</div>
{/if}

<style lang="scss">
	#h1-container {
		position: absolute;
		left: 41vw;
		bottom: 15.4vw;
		z-index: 8;

		h1,
		span {
			font-size: 15.63vw;
			line-height: 18.75vw;
			margin: 0;
			position: absolute;
		}

		h1 {
			background: linear-gradient(180deg, #ffffff 47.92%, #bababa 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			text-fill-color: transparent;
			z-index: 3;
		}

		span {
			color: var(--primary-color);
			font-weight: 700;
			top: 0.78vw;
		}
	}
</style>
