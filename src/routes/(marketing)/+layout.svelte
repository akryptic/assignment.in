<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="grid h-full w-full grid-rows-[auto_1fr_auto]">
	<Navbar user={data.user} />
	{@render children?.()}
	<Footer />
</div>
