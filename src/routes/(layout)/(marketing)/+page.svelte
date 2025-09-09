<script lang="ts">
	import { appName } from '$lib/constants';
	import heroDecor from '$lib/assets/images/hero-decoration.png';
</script>

<svelte:head>
	<title>{appName}</title>
</svelte:head>

<main>
	<div class="bg-base-300 py-16">
		<div class="container mx-auto flex items-start justify-between gap-24 py-16">
			<div class="space-y-6">
				<h1 class="text-5xl leading-snug font-bold">
					Tired of Writing <br /> Assignments <br /> All Night?
				</h1>
				<p class="font-medium max-w-3/4" >
					Focus on learning, not endless handwriting. Upload your requirements, and we’ll deliver
					neatly written assignments straight to you — quick, reliable, and stress-free.
				</p>

				<a href="/@me" class="btn btn-primary btn-lg btn-wide">Upload Your Task</a>
			</div>
			<div class="scale-150">
				<img class="h-full w-full" src={heroDecor} alt="" />
			</div>
		</div>
	</div>
</main>
