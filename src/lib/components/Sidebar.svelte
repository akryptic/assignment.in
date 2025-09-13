<script>
	import { page } from '$app/state';
	import { CircleQuestionMark, MapPin, Package, UserCog } from '@lucide/svelte';
</script>

<nav class="bg-base-300 px-8 py-6">
	<ul class="flex h-full flex-col space-y-3">
		<li>
			<a
				class="flex items-center gap-3 rounded-md px-4 py-2 text-base font-semibold opacity-80 hover:bg-white/10"
				class:active={page.url.pathname === '/@me/orders'}
				href="/@me/orders"
			>
				<Package size="24" />My Orders</a
			>
		</li>
		<li>
			<a
				class="flex items-center gap-3 rounded-md px-4 py-2 text-base font-semibold opacity-80 hover:bg-white/10"
				class:active={page.url.pathname === '/@me/addresses'}
				href="/@me/addresses"
			>
				<MapPin size="24" />Addresses</a
			>
		</li>
		<!-- <li>
			<a
				class="flex items-center gap-3 rounded-md px-4 py-2 text-base font-semibold opacity-80 hover:bg-white/10"
                class:active={page.url.pathname === '/payment-methods'}
				href="/orders"
			>
				<CreditCard size="24" />Payment Methods</a
			>
		</li> -->

		<li class="mt-auto">
			<a
				class="flex items-center gap-3 rounded-md px-4 py-2 text-base font-semibold opacity-80 hover:bg-white/10"
				class:active={page.url.pathname === '/@me'}
				href="/@me"
			>
				<UserCog size="24" />Profile Settings</a
			>
		</li>
		<li>
			<a
				class="flex items-center gap-3 rounded-md px-4 py-2 text-base font-semibold opacity-80 hover:bg-white/10"
				class:active={page.url.pathname === '/help'}
				href="/help"
			>
				<CircleQuestionMark size="24" />Help Center</a
			>
		</li>
	</ul>
</nav>

<style lang="postcss">
	@reference "../../app.css";

	.active {
		@apply bg-black/25;
	}
</style>
