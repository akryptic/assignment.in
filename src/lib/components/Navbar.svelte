<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import googleLogo from '$lib/assets/brand-icons/google-logo.svg';
	import {
		ChevronsUpDown,
		LayoutGrid,
		LogOut,
		MessagesSquare,
		Scale,
		ScrollText,
		UserCogIcon
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import AppName from './AppName.svelte';

	const { user } = $props();

	let isMenuOpen = $state(false);

	beforeNavigate(() => {
		isMenuOpen = false;
	});

	$effect(() => {
		if (browser) {
			if (isMenuOpen) {
				document.body.style.overflow = 'hidden';
			} else if (!isMenuOpen) {
				document.body.style.overflow = 'auto';
			}
		}
	});
</script>

<header
	class=" static top-0 left-0 flex w-full items-center justify-between border-b-2 border-gray-500/30 bg-base-300 px-4 py-4 sm:px-8"
>
	<div class="flex items-center justify-center">
		<a href="/" class="text-2xl font-medium"><AppName element="span" /></a>
	</div>

	<div class="flex items-center gap-4">
		<div class="relative">
			{#if user?.image}
				<button
					onclick={() => (isMenuOpen = !isMenuOpen)}
					class="flex cursor-pointer items-center gap-2 rounded-lg bg-black/20 px-2 py-1.5 text-gray-400 hover:bg-black/10 active:scale-95 {isMenuOpen &&
						'invisible'}"
				>
					<div class="avatar">
						<div class="w-8 rounded-full border-2 border-gray-500/20">
							<img
								src={user?.image}
								alt="Profile"
								width="24"
								height="24"
								referrerPolicy="no-referrer"
							/>
						</div>
					</div>
					<div class="flex flex-col items-center justify-start">
						<p class="text-xs font-medium">Welcome Back</p>
						<p
							class="max-w-28 overflow-hidden leading-tight font-semibold text-ellipsis whitespace-nowrap"
						>
							{user.name}
						</p>
					</div>
					<ChevronsUpDown size="20" />
				</button>
				{#if isMenuOpen}
					<div
						tabindex="0"
						role="dialog"
						onkeydown={(e) => e.key === 'Escape' && (isMenuOpen = false)}
						onclick={() => (isMenuOpen = false)}
						class="fixed top-0 left-0 z-10 h-full w-full bg-black/50"
					></div>
					<div
						class="absolute top-2 right-0 z-10 w-max overflow-hidden rounded-2xl bg-base-300 shadow-lg shadow-black/20 backdrop-blur"
						transition:fly={{ y: -20, duration: 100 }}
					>
						<div class="flex gap-3 px-5 py-3 text-gray-300">
							<div class="avatar">
								<div class="w-12 rounded-full border-2 border-gray-500/20">
									<img
										src={user?.image}
										alt="Profile"
										width="24"
										height="24"
										referrerPolicy="no-referrer"
									/>
								</div>
							</div>
							<div class="">
								<p class="text-lg font-semibold">{user?.name}</p>
								<p>{user?.email}</p>
							</div>
						</div>
						<hr class="border-gray-500/30" />
						<ul class="">
							{#if user?.isAdmin}
								<li>
									<a class="flex items-center gap-4 px-8 py-3 hover:bg-white/5" href="/app?/admin"
										><UserCogIcon size="24" /> Admin Dashboard</a
									>
								</li>
							{:else}
								<li>
									<a class="flex items-center gap-4 px-8 py-3 hover:bg-white/5" href="/@me"
										><LayoutGrid size="24" /> Dashboard</a
									>
								</li>
								<li>
									<a class="flex items-center gap-4 px-8 py-3 hover:bg-white/5" href="/contact"
										><MessagesSquare size="24" /> Contact Us</a
									>
								</li>
								<li>
									<a class="flex items-center gap-4 px-8 py-3 hover:bg-white/5" href="/terms"
										><ScrollText size="24" /> Terms & Conditions</a
									>
								</li>
								<li>
									<a class="flex items-center gap-4 px-8 py-3 hover:bg-white/5" href="/legal"
										><Scale size="24" /> Legal Policies</a
									>
								</li>
							{/if}
							<li>
								<form action="/@me?/logout" method="POST">
									<button
										class="flex w-full cursor-pointer items-center gap-4 bg-error/25 px-8 py-3 text-error hover:bg-error/40"
										type="submit"><LogOut size="24" /> Logout</button
									>
								</form>
							</li>
						</ul>
					</div>
				{/if}
			{:else if page.route.id !== '/auth'}
				<a href="/auth" class="btn btn-soft btn-sm btn-primary">
					<img src={googleLogo} alt="Google Logo" width="12" height="12" /> Login
				</a>
			{/if}
		</div>
	</div>
</header>
