<script lang="ts">
	import type { PageProps } from './$types';
	import noOrdersImg from '$lib/assets/images/no-orders.png';
	import { Plus } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>My Orders</title>
</svelte:head>

<main class="relative">
	<div class="absolute inset-0 m-auto h-fit w-fit space-y-6 text-center">
		<img src={noOrdersImg} alt="No orders found" />
		<h3 class="text-2xl font-semibold opacity-75">No Orders Yet - Lets create your first one!</h3>
		<a href="/@me/orders/new" class="btn btn-lg btn-primary"><Plus /> New Order</a>
	</div>
</main>
