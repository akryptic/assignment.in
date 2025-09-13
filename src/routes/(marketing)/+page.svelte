<script lang="ts">
	import heroDecor from '$lib/assets/images/hero-decoration.png';
	import { appName } from '$lib/constants';
	import { GraduationCap, LockKeyhole, PenTool, Quote, Zap, type Icon } from '@lucide/svelte';

	interface StepProps {
		step: number;
		title: string;
		description: string;
		imageURL: string;
		position: 'left' | 'right';
		isLastStep?: boolean;
	}

	interface ChooseUsProps {
		title: string;
		description: string;
		icon: typeof Icon;
	}

	interface ReviewCardProps {
		quote: string;
		name: string;
		designation: string;
		imgURL: string;
	}

	const steps: Omit<StepProps, 'isLastStep' | 'position' | 'step'>[] = [
		{
			title: 'Login & Upload Your Assignment',
			description:
				'Sign in instantly with Google, then share your assignment details and requirements in just a few clicks.',
			imageURL: 'https://placehold.co/440x264'
		},
		{
			title: 'We Write It for You',
			description:
				"Our expert team neatly handwrites your assignments with accuracy and care, just like you'd do.",
			imageURL: 'https://placehold.co/440x264'
		},
		{
			title: 'Get It Delivered On Time',
			description:
				'Receive your handwritten assignment right at your doorstep, ready to submit without any hassle.',
			imageURL: 'https://placehold.co/440x264'
		}
	];

	const chooseUs: ChooseUsProps[] = [
		{
			title: '100% Handwritten',
			description: "Every assignment is written neatly, just like you'd do in class.",
			icon: PenTool
		},
		{
			title: 'On-Time Delivery',
			description: 'Never miss a deadline again - we always deliver before time.',
			icon: Zap
		},
		{
			title: 'Easy on Your Pocket',
			description: 'Affordable pricing made for school & college students.',
			icon: GraduationCap
		},
		{
			title: 'Secure & Reliable',
			description: 'Your data and assignments are kept completely safe.',
			icon: LockKeyhole
		}
	];

	const dummyReviews: ReviewCardProps[] = [
		{
			name: 'Jane Doe',
			designation: 'B.Tech Student',
			quote:
				'I was struggling to keep up with my assignments, but this service saved me! The handwritten work was impeccable and delivered right on time. Highly recommend!',
			imgURL: 'https://placehold.co/64x64'
		},
		{
			name: 'John Smith',
			designation: 'MBA Student',
			quote:
				'As a busy professional, I needed help with my coursework. This service provided exactly what I needed - quality handwritten assignments that looked like my own work.',
			imgURL: 'https://placehold.co/64x64'
		},
		{
			name: 'Emily Johnson',
			designation: 'High School Student',
			quote:
				'The team was so easy to work with and the final product exceeded my expectations. My teachers were impressed with the quality of my assignments!',
			imgURL: 'https://placehold.co/64x64'
		},
		{
			name: 'Michael Brown',
			designation: 'PhD Candidate',
			quote:
				'This service is a game-changer for anyone who struggles with handwriting or has a busy schedule. The handwritten assignments were flawless and delivered on time.',
			imgURL: 'https://placehold.co/64x64'
		},
		{
			name: 'Sarah Wilson',
			designation: 'College Student',
			quote:
				'I was skeptical at first, but this service exceeded my expectations. The handwritten assignments were of the highest quality and delivered right to my door.',
			imgURL: 'https://placehold.co/64x64'
		}
	];
</script>

<svelte:head>
	<title>{appName}</title>
</svelte:head>

<main>
	<section class="bg-base-300 py-16">
		<div class="container mx-auto grid grid-cols-2 gap-8 py-24">
			<div class="space-y-6">
				<h1 class="text-6xl leading-snug font-bold">
					Tired of Writing <br /> Assignments <br /> All Night?
				</h1>
				<p class="max-w-3/4 font-medium">
					Focus on learning, not endless handwriting. Upload your requirements, and we'll deliver
					neatly written assignments straight to you — quick, reliable, and stress-free.
				</p>

				<a href="/@me" class="btn btn-wide btn-lg btn-primary">Upload Your Task</a>
			</div>
			<div class="scale-125">
				<img class="h-full w-full" src={heroDecor} alt="Decoration Illustration" />
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="container mx-auto space-y-8 text-center">
			<h3 class="text-5xl leading-snug font-bold">How It Works In Three <br /> Simple Steps</h3>
			<p class="text-lg font-medium">
				No stress, no late nights — just upload, relax, and get your handwritten assignment
				delivered.
			</p>

			<div class="mt-24">
				{#each steps as stp, i (stp.title)}
					{@const isOdd = i % 2 !== 0}
					{@render step({
						step: i + 1,
						title: stp.title,
						description: stp.description,
						imageURL: stp.imageURL,
						position: isOdd ? 'right' : 'left',
						isLastStep: i == 2
					})}
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-base-300 py-16">
		<div class="container mx-auto space-y-4 text-center">
			<h3 class="text-5xl font-bold">Why Choose Us?</h3>
			<p class="font-xl text-lg">We make assignment help stress-free, reliable, and affordable.</p>
			<div class="flex justify-center gap-12 p-8">
				{#each chooseUs as ccard}
					{@render choose_us_card(ccard)}
				{/each}
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="container mx-auto space-y-4 text-center">
			<h3 class="text-5xl font-bold">What Our Users Say</h3>
			<p class="font-xl text-lg">Real experiences from users who've aced their assignments.</p>
			<div class="no-scroll flex gap-12 overflow-scroll p-8">
				{#each dummyReviews as review}
					{@render review_card(review)}
				{/each}
			</div>
		</div>
	</section>
</main>

<!-- Step Parts -->
{#snippet step({ step, title, description, position, imageURL, isLastStep = false }: StepProps)}
	<div class="grid grid-cols-[1fr_auto_1fr] gap-64">
		<div class="space-y-3.5 text-left">
			{#if position === 'left'}
				{@render step_content(step, title, description)}
			{:else}
				<img src={imageURL} alt="" class="mb-16 rounded-xl" />
			{/if}
		</div>
		<div class="flex-col">
			<div class="-mt-0.5 h-6 w-6 rounded-full bg-primary"></div>
			{#if !isLastStep}
				<hr class="mx-auto -mt-1 h-full min-h-12 w-1.5 bg-primary" />
			{/if}
		</div>
		<div class="space-y-3.5 text-left">
			{#if position === 'right'}
				{@render step_content(step, title, description)}
			{:else}
				<img src={imageURL} alt="" class="mb-16 rounded-xl" />
			{/if}
		</div>
	</div>
{/snippet}

{#snippet step_content(step: number, title: string, description: string)}
	<div class="text-md w-fit rounded-lg bg-primary/10 px-8 py-1.5 font-semibold text-primary">
		Step {step}
	</div>
	<h3 class="text-xl font-bold">{title}</h3>
	<p class="max-w-3/4 font-medium">{description}</p>
{/snippet}

<!-- Choose Us Card -->
{#snippet choose_us_card({ icon: Icn, title, description }: ChooseUsProps)}
	<div class="space-y-6 rounded-2xl bg-primary/15 px-4 py-12 text-center">
		<Icn class="mx-auto text-primary" size="128" />
		<h4 class="text-2xl font-semibold text-primary">{title}</h4>
		<p class="font-medium">{description}</p>
	</div>
{/snippet}

<!-- Review Card -->
{#snippet review_card({ name, designation, quote, imgURL }: ReviewCardProps)}
	<div class="w-fit min-w-md space-y-3 rounded-2xl bg-white/90 p-8 text-neutral shadow-md">
		<div class="h-fit w-fit rounded-full bg-primary/30 p-4">
			<Quote size="32" class="rotate-180 text-gray-400" />
		</div>
		<p class="mt-4 text-lg italic">"{quote}"</p>
		<div class="flex items-center space-x-4">
			<img src={imgURL} alt="" class="h-12 w-12 rounded-full" />
			<div class="text-left">
				<h4 class="font-bold">{name}</h4>
				<p class="text-sm">{designation}</p>
			</div>
		</div>
	</div>
{/snippet}
