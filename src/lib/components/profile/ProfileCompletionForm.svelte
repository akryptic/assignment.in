<script lang="ts">
	import { updateProfileSchema } from '$lib/form-schemas/profile-schema';
	import { Control, Field, FieldErrors, Fieldset } from 'formsnap';
	import { fly } from 'svelte/transition';
	import { fieldProxy, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { isProfileComplete, image, form }: { isProfileComplete: boolean, image?: string; form: any } = $props();

	const updateProfileForm = superForm(form, {
		validators: zodClient(updateProfileSchema)
	});

	const { form: updateProfileFormData, delayed, submitting, enhance } = updateProfileForm;
	const dob = fieldProxy(updateProfileForm, 'dob');
</script>

{#if !isProfileComplete}
	<div
		transition:fly={{ y: -20, delay: 1000 }}
		class="pointer-events-none absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/75 backdrop-blur-xs"
	>
		<form
			method="POST"
			action="/@me?/completeProfile"
			use:enhance
			class="pointer-events-auto flex flex-col items-center justify-center rounded-xl bg-base-100 px-24 py-12 shadow-lg shadow-black/25"
		>
			<img src={image} alt="Profile" class="mb-8 rounded-full" />

			<h2 class="text-3xl font-bold">Complete Your Profile</h2>
			<p class="mb-8 text-lg">Please complete your profile to create an account.</p>

			<div class="mt-4 flex w-full gap-8">
				<div class="mb-4">
					<Field form={updateProfileForm} name="dob">
						<Control>
							{#snippet children({ props })}
								<div class="field">
									<span class="ml-1 text-sm opacity-75">Date of Birth</span>
									<input
										{...props}
										type="date"
										bind:value={$dob}
										class="input input-lg w-full rounded-md bg-base-200"
									/>
								</div>
							{/snippet}
						</Control>
						<FieldErrors class="mt-1 text-red-400" />
					</Field>
				</div>

				<div class="mb-4">
					<Fieldset form={updateProfileForm} name="gender">
						<span class="ml-1 text-sm opacity-75">Gender</span>
						<div class="flex gap-4 p-2.5">
							<Control>
								{#snippet children({ props })}
									<div class="field">
										<input
											{...props}
											type="radio"
											bind:group={$updateProfileFormData.gender}
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
											bind:group={$updateProfileFormData.gender}
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

			<div class="mb-4 w-full">
				<Field form={updateProfileForm} name="phone">
					<Control>
						{#snippet children({ props })}
							<div class="field">
								<span class="ml-1 text-sm opacity-75">Phone (Indian Only)</span>
								<input
									{...props}
									type="text"
									placeholder="Enter your phone number"
									bind:value={$updateProfileFormData.phone}
									class="input input-lg w-full rounded-md bg-base-200"
								/>
							</div>
						{/snippet}
					</Control>
					<FieldErrors class="mt-1 text-red-400" />
				</Field>
			</div>

			<div class="mt-4 w-full">
				<p class="text-xs opacity-75">
					Your details are kept private and used only for account purposes.
				</p>
				<button
					disabled={$submitting}
					type="submit"
					class="btn mt-3 w-full text-xl font-bold btn-lg btn-primary"
				>
					{#if $delayed}
						<span class="loading loading-spinner"></span>
					{/if}
					Continue</button
				>
			</div>
		</form>
	</div>
{/if}
