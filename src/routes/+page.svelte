<script lang="ts">
	import H1 from "$lib/components/H1.svelte";
	import Welcome from "$lib/components/Welcome.svelte";
	import { onMount } from "svelte";

	onMount(() => {
		document.title = "ГрибКо - Комбуча - Пить";
	});
</script>

<H1 />
<Welcome />
