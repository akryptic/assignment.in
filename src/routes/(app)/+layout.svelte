<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ProfileCompletionForm from '$lib/components/profile/ProfileCompletionForm.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { data, children } = $props();
</script>

<div class="grid h-screen w-screen grid-rows-[auto_1fr] overflow-hidden">
	<Navbar user={data.user} />
	<div class="relative grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<Sidebar />
		{@render children?.()}
		<ProfileCompletionForm
			isProfileComplete={data.isProfileComplete}
			image={data.user.image}
			form={data.form}
		/>
	</div>
</div>
