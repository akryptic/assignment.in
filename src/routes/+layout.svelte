<script lang="ts">
	import type { LayoutProps } from './(layout)/$types';
	import '../app.css';

	let { data, children }: LayoutProps = $props();
</script>

<div class="min-h-screen w-full bg-base-100">
	{@render children()}
</div>
