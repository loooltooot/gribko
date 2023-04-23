<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	onMount(() => {
		document.title = $page.status.toString();
	});
</script>

<div>
	<a href="/">
		<h2 class="big-text">{$page.status}</h2>
	</a>
	<p>{$page.error?.message}</p>
</div>

<style lang="scss">
	div {
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 65vh;
		width: 100%;
		flex-direction: column;

		h2 {
			margin: 0;
			transition: transform 0.3s ease;

			&:hover {
				transform: translateY(-0.5vw);
			}
		}

		p {
			margin-top: 1.56vw;
		}
	}
</style>
