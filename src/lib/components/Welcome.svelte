<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function disappear(node: Element) {
		return {
			duration: 1,
			css: () => {
				return `opacity: 0; position: absolute;`;
			},
		};
	}
</script>

{#if mounted}
	<section in:fade={{ duration: 1000 }} out:disappear id="welcome-container">
		<ul>
			<li>
				<span class="big-text">#1</span><span class="content"
					>производитель комбучи в России
				</span>
			</li>
			<li>
				<span class="big-text">32</span><span class="content"
					>года на рынке
				</span>
			</li>
			<li>
				<span class="big-text">131</span><span class="content"
					>сотрудник</span
				>
			</li>
		</ul>
		<img
			src="/img/grib.png"
			width="559"
			height="427"
			alt="ГрибКо производство комбучи"
		/>
	</section>
{/if}

<style lang="scss">
	@keyframes gribSpin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(-2deg);
		}
	}

	#welcome-container {
		border: 0.1vw var(--primary-color) solid;
		padding: 3.18vw 2.29vw;
		height: 39.58vw;
		box-sizing: border-box;
		position: relative;

		ul {
			flex-direction: column;
			row-gap: 0.73vw;

			span.content {
				font-size: var(--h2-font);
				font-weight: 700;
				margin-left: 1.15vw;
			}
		}

		img {
			width: 29.11vw;
			height: 22.24vw;
			position: absolute;
			right: 0;
			top: 3.18vw;
			animation: gribSpin forwards infinite alternate 4s ease;
		}
	}
</style>
