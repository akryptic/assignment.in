<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { orderTrackerFormSchema } from '$lib/form-schemas/track-order-schema';

	let { data }: PageProps = $props();

	const orderTrackerForm = superForm(data.form, {
		validators: zodClient(orderTrackerFormSchema)
	});

	const { form, submitting, delayed, message } = orderTrackerForm;
</script>