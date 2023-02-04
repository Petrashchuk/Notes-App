<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount, createEventDispatcher } from 'svelte';
	import { notesStore } from '../stores/notes';
	import NoteButton from './NoteButton.svelte';

	let selectedNoteIndex = 0;
	const refs: Record<string, HTMLButtonElement> = {};

	const dispatch = createEventDispatcher();

	const handleSelectNote = (index: number, id: string) => {
		selectedNoteIndex = index;
		dispatch('noteSelect', id);
	};

	$: sortedNotes = $notesStore.sort(
		(a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
	);

	onMount(() => {
		if (Object.values(refs).length !== 0) {
			Object.values(refs)[0]?.focus();
		}
	});

	const getDateCategory = (date?: Date) => {
		if (!date) return;

		const dateCategories: Record<string, string> = {
			today: 'Today',
			yesterday: 'Yesterday',
			week: 'Previous 7 Days',
			month: 'Previous month',
			year: 'Previous year',
			rest: ''
		};

		const differences = {
			year: dayjs().diff(date, 'year'),
			month: dayjs().diff(date, 'month'),
			week: dayjs().diff(date, 'week'),
			day: dayjs().diff(date, 'day')
		};

		let category = 'rest';

		if (differences.day === 0) category = 'today';
		else if (differences.day === 1) category = 'yesterday';
		else if (differences.week === 0) category = 'week';
		else if (differences.month === 0) category = 'month';
		else if (differences.year === 0) category = 'year';

		return dateCategories[category];
	};
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
		<div class="text-gray-500 p-2 mb-2 border-b border-b-gray-300">
			{getDateCategory($notesStore[0]?.updated)}
		</div>
		{#each sortedNotes as note, i (note.id)}
			{@const isLastNote = $notesStore.length - 1 === i}
			{@const isFirstNote = 0 === i}
			{@const isNoteSelected = selectedNoteIndex === i}
			{@const isNextNoteAfterSelected = selectedNoteIndex === i + 1}
			{@const isNewDateCategory =
				getDateCategory(note.updated) !== getDateCategory($notesStore[i - 1]?.updated)}
			{@const willBeNewDateCategory =
				getDateCategory(note.updated) !== getDateCategory($notesStore[i + 1]?.updated)}

			{#if isNewDateCategory && !isFirstNote}
				<div class="text-gray-500 mb-2 mt-2">
					{getDateCategory(note.updated)}
				</div>
			{/if}

			<NoteButton
				on:click={() => handleSelectNote(i, note.id)}
				on:focus={() => handleSelectNote(i, note.id)}
				{note}
				bindButton={refs}
				{isNoteSelected}
			/>

			{#if isLastNote || selectedNoteIndex === i || isNextNoteAfterSelected || willBeNewDateCategory}
				<div class="border-b border-b-transparent" />
			{:else}
				<div class="border-b w-[95%] ml-auto border-b-gray-300" />
			{/if}
		{/each}
	{/if}
</div>
