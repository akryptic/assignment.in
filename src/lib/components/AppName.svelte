<script lang="ts">
	const { element, className }: { element: 'h1' | 'h2' | 'h3' | 'span'; className?: string } =
		$props();
</script>

<svelte:element this={element} class="font-semibold {className ? className : ''}">
	Assign<span class="font-bold text-emerald-600">ment</span>.in
</svelte:element>
