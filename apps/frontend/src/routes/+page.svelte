<script lang="ts">
	import Editor from '../components/Editor.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Spinner from '../components/Spinner.svelte';
	import { fade } from 'svelte/transition';
	import { notesStore } from '../stores/notes';

	let isPageVisible: boolean | undefined;
	let selectedNoteId: string | undefined;

	const handleNoteSelect = (event: CustomEvent<string>) => (selectedNoteId = event.detail);
</script>

{#await notesStore.init()}
	<div
		transition:fade
		on:introstart={() => (isPageVisible = false)}
		on:outroend={() => (isPageVisible = true)}
		class="flex w-full items-center justify-center h-screen"
	>
		<Spinner />
	</div>
{:then}
	{#if isPageVisible}
		<div in:fade class="flex items-start h-screen">
			<Sidebar on:noteSelect={handleNoteSelect} />
			<Editor {selectedNoteId} />
		</div>
	{/if}
{:catch}
	<p>error</p>
{/await}
