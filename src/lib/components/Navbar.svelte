<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import googleLogo from '$lib/assets/brand-icons/google-logo.svg';
	import { LayoutGrid, LogOut, Package, UserRoundCog } from '@lucide/svelte';

	const { image, isAdmin }: { image?: string; isAdmin?: boolean } = $props();
</script>

<header
	class=" static top-0 left-0 flex w-full items-center justify-between border-b-2 border-gray-500/30 bg-base-300 px-8 py-4"
>
	<div class="flex items-center justify-center">
		<a href="/" class="text-xl font-medium"
			>Assign<span class="font-semibold text-emerald-500">ment</span>.in</a
		>
	</div>

	<div class="flex items-center gap-4">
		{#if image}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
					<div class="w-10 rounded-full border-2 border-gray-500/20">
						<img src={image} alt="Profile" width="24" height="24" />
					</div>
				</div>
				<ul
					tabindex="0"
					role="menu"
					class="dropdown-content menu z-1 mt-3 w-max menu-sm rounded border border-gray-500/30 bg-base-200 p-1 text-xs shadow"
				>
					{#if isAdmin}
						<li><a href="/admin"> <UserRoundCog size="16" /> Admin Panel</a></li>
					{:else}
						<li><a href="/@me"> <LayoutGrid size="16" />Dashboard</a></li>
					{/if}
					<li><a href="/order-tracker"> <Package size="16" />Track Order</a></li>
					<hr class="hr my-1 text-gray-500/30" />
					<li class="overflow-hidden rounded-lg">
						<form action="/@me?/logout" method="POST" use:enhance class="flex p-0 text-xs">
							<button
								class="flex w-full cursor-pointer gap-2 px-2.5 py-1 text-error hover:bg-error/10"
								><LogOut size="16" /> Logout</button
							>
						</form>
					</li>
				</ul>
			</div>
		{:else if page.route.id !== '/auth'}
			<a href="/auth" class="btn btn-soft btn-sm btn-primary">
				<img src={googleLogo} alt="Google Logo" width="12" height="12" /> Login
			</a>
		{/if}
	</div>
</header>
