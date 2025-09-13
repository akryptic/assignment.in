<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let { data, children } = $props();
</script>

<div class="grid h-full w-full grid-rows-[auto_1fr]">
	<Navbar user={data.user} />
	{@render children?.()}
</div>
