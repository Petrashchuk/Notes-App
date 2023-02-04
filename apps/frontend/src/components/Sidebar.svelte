<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte/types/runtime/internal/lifecycle';
	import { notesStore } from '../stores/notes';
	import { extractSecondLine } from '../utils/extractAllApartFirstLine';
	import { stripHtmlTags } from '../utils/stripHtmlTags';

	let selectedNoteIndex = 0;
	const refs: Record<string, HTMLButtonElement> = {};

	const isLastNote = (noteOrderIndex: number) => $notesStore.length + 1 === noteOrderIndex;
	const isNoteSelected = (noteOrderIndex: number) => selectedNoteIndex === noteOrderIndex;
	const isNextNoteAfterSelected = (noteOrderIndex: number) =>
		selectedNoteIndex === noteOrderIndex + 1;

	const dispatch = createEventDispatcher();

	const handleSelectNote = (index: number, id: string) => {
		selectedNoteIndex = index;
		dispatch('noteSelect', id);
	};

	onMount(() => {
		if (Object.values(refs).length !== 0) {
			Object.values(refs)[0]?.focus();
		}
	});
</script>

<div
	class="w-1/4 border-r border-r-gray-300 pl-3 pr-3 pt-5 pb-3 h-screen overflow-scroll"
	role="tablist"
>
	{#if $notesStore.length === 0}
		<div class="flex justify-center items-center w-full h-full">
			<span class="font-normal text-2xl text-gray-500"> No Notes </span>
		</div>
	{:else}
		{#each $notesStore as note, i (note.id)}
			<button
				class="grid grid-cols-[auto_1fr] 
				justify-items-start text-start 
				gap-x-[8px] py-2 pl-7 pr-2 
				{selectedNoteIndex === i ? 'bg-neutral-300 border-b-transparent rounded-md' : ''}
				focus:bg-amber-200 focus:border-b-transparent focus:rounded-md 
				last:border-b-0
				outline-none
				w-full"
				id={note.name}
				bind:this={refs[note.id]}
				aria-selected={selectedNoteIndex === i}
				role="tab"
				on:click={() => handleSelectNote(i, note.id)}
				on:focus={() => handleSelectNote(i, note.id)}
			>
				<span class="font-bold col-span-2 truncate w-full">
					{note.name ? note.name : 'New Note'}
				</span>
				<span class="font-normal text-xs">{dayjs(note.updated).format('DD.MM.YYYY')}</span>
				<span class="font-normal truncate w-full text-xs text-gray-500 tracking-wide"
					>{stripHtmlTags(extractSecondLine(note.content)) ?? 'No additional text'}</span
				>
			</button>

			{#if isLastNote(i) || isNoteSelected(i) || isNextNoteAfterSelected(i)}
				<div class="border-b border-b-transparent" />
			{:else}
				<div class="border-b w-[95%] ml-auto border-b-gray-300" />
			{/if}
		{/each}
	{/if}
</div>
