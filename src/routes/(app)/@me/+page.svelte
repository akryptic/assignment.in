<script lang="ts">
	import { Control, Field, FieldErrors, Fieldset, Label } from 'formsnap';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { profileSchema } from '$lib/form-schemas/profile-schema';

	let { data }: PageProps = $props();

	const profileForm = superForm(data.form, {
		validators: zodClient(profileSchema)
	});

	const { form: formData, delayed, submitting, enhance } = profileForm;
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<main class="p-16">
	<h1 class="text-3xl font-bold">Profile Settings</h1>
	<div class="mt-8 w-full rounded-xl bg-base-300">
		<form method="POST" use:enhance>
			<div class="flex items-center gap-8 border-b border-gray-500/30 p-8">
				<div class="avatar">
					<div class="w-32 rounded-full ring-2 ring-gray-500 ring-offset-2 ring-offset-base-100">
						<img src={data.user.image} alt="Profile" />
					</div>
				</div>
				<div>
					<h3 class="text-2xl font-bold">Personal Information</h3>
					<div class="mt-4">
						<Field form={profileForm} name="name">
							<Control>
								{#snippet children({ props })}
									<div class="field">
										<input
											{...props}
											type="text"
											bind:value={$formData.name}
											class="input input-lg w-full rounded-md bg-base-200"
										/>
									</div>
								{/snippet}
							</Control>
							<FieldErrors class="mt-1 text-red-400" />
						</Field>
					</div>
				</div>
			</div>
			<div class="p-8">
				<div class="mt-4 flex w-full gap-8 [&>*]:w-full">
					<div class="mb-4">
						<Field form={profileForm} name="dob">
							<Control>
								{#snippet children({ props })}
									<div class="field">
										<span class="text-md ml-1 opacity-75">Date of Birth</span>
										<input
											{...props}
											type="date"
											bind:value={$formData.dob}
											class="input input-lg mt-1 w-full rounded-md bg-base-200"
										/>
									</div>
								{/snippet}
							</Control>
							<FieldErrors class="mt-1 text-red-400" />
						</Field>
					</div>

					<div class="mb-4">
						<Field form={profileForm} name="phone">
							<Control>
								{#snippet children({ props })}
									<div class="field">
										<span class="text-md ml-1 opacity-75">Phone Number</span>
										<input
											{...props}
											type="text"
											bind:value={$formData.phone}
											class="input input-lg mt-1 w-full rounded-md bg-base-200"
										/>
									</div>
								{/snippet}
							</Control>
							<FieldErrors class="mt-1 text-red-400" />
						</Field>
					</div>

					<div class="mb-4">
						<Fieldset form={profileForm} name="gender">
							<span class="text-md ml-1 opacity-75">Gender</span>
							<div class="mt-1 flex gap-4 p-2.5">
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<input
												{...props}
												type="radio"
												bind:group={$formData.gender}
												value="male"
												class="radio radio-sm radio-primary"
											/>
											<span class="ml-1 text-sm opacity-75">Male</span>
										</div>
									{/snippet}
								</Control>
								<Control>
									{#snippet children({ props })}
										<div class="field">
											<input
												{...props}
												type="radio"
												bind:group={$formData.gender}
												value="female"
												class="radio radio-sm radio-primary"
											/>
											<span class="ml-1 text-sm opacity-75">Female</span>
										</div>
									{/snippet}
								</Control>
							</div>
							<FieldErrors class="mt-1 text-red-400" />
						</Fieldset>
					</div>
				</div>
			</div>
		</form>
	</div>
</main>
