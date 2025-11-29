<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>My Addresses</title>
</svelte:head>

<main class="p-10">
	<h3 class="text-2xl" >Address</h3>
	<div class="bg-base-300 p-6 rounded-xl mt-4">
		<button class="w-full border cursor-pointer border-dashed border-primary p-4 rounded-lg flex items-center gap-4 text-primary">
			<Plus />
			<span class="text-xl" >Add a new Address</span>
		</button>
	</div>
</main>