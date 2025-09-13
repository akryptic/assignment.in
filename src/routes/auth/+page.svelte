<script lang="ts">
	import googleLogo from '$lib/assets/brand-icons/google-logo.svg';
	import authDecoration from '$lib/assets/images/auth-decoration.png';
	import AppName from '$lib/components/AppName.svelte';
	import { appName } from '$lib/constants';
	import { emptySchema } from '$lib/form-schemas/empty-schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const loginForm = superForm(data.form, {
		validators: zodClient(emptySchema)
	});

	const { delayed, submitting, enhance } = loginForm;
</script>

<svelte:head>
	<title>Authenticate | {appName}</title>
</svelte:head>

<main class="grid grid-rows-[auto_1fr] md:h-screen lg:grid-cols-2 lg:grid-rows-1">
	<!-- LEFT: Illustration -->
	<div
		class="fixed top-0 left-0 h-full w-full overflow-hidden sm:static sm:h-[520px] sm:w-full sm:p-5 lg:h-full lg:p-0"
	>
		<img
			src={authDecoration}
			alt="Students Studying Illustration"
			class="h-full w-full rounded-none object-cover sm:rounded-2xl lg:rounded-none"
		/>
	</div>

	<!-- RIGHT: Content -->
	<div class="flex h-fit w-full flex-col items-center justify-center gap-8 px-6 py-10 lg:my-auto">
		<!-- Top Section: Heading and Subheading -->
		<div class="w-full max-w-xl space-y-6 text-center">
			<!-- Responsive header wrapper -->
			<div
				class="fixed top-0 left-0 w-full rounded-b-4xl bg-base-100 p-6 sm:static sm:rounded-none sm:p-0"
			>
				<h1 class="text-2xl font-bold text-base-content sm:text-4xl">
					Welcome To <AppName element="span" />
				</h1>
				<p class="mt-4 text-base font-medium text-base-content/70 sm:text-lg">
					From uploading your assignments to receiving carefully handwritten solutions, we make the
					entire process simple and stress-free.
				</p>
			</div>
		</div>

		<!-- Bottom Section: Auth Box -->
		<div class="w-full max-w-xl">
			<div
				class="fixed bottom-0 left-0 w-full overflow-hidden rounded-t-4xl bg-base-100 sm:static sm:rounded-2xl sm:bg-transparent"
			>
				<form
					method="POST"
					class="space-y-2 rounded-2xl bg-primary/10 p-6 text-center sm:px-12 sm:py-8"
					use:enhance
				>
					<h3 class="text-xl font-semibold text-base-content sm:text-2xl">Let's Get Started</h3>
					<p class="text-base font-medium text-base-content/70">
						Continue with your Google account.
					</p>

					<button disabled={$submitting} class="btn mt-4 w-full btn-lg btn-primary">
						{#if $delayed}
							<span class="loading loading-spinner"></span>
						{/if}
						<img src={googleLogo} alt="Google Logo" class="mr-2 h-5 w-5" />
						Authenticate
					</button>

					<p class="text-center text-sm text-base-content/60 sm:hidden">
						By continuing, you accept our
						<a href="/terms" class="link link-info">Terms</a>
					</p>
				</form>
			</div>
		</div>

		<!-- Terms - Desktop only -->
		<p class="hidden text-sm text-base-content/60 sm:inline">
			By continuing, you accept our
			<a href="/terms" class="link link-info">Terms</a>
		</p>

		<a href="/" class="link text-xs opacity-75">Go Back Home</a>
	</div>
</main>
