<script lang="ts">
	import type { Note } from '../stores/notes';
	import { extractSecondLine } from '../utils/extractAllApartFirstLine';
	import { stripHtmlTags } from '../utils/stripHtmlTags';
	import dayjs from 'dayjs';

	export let isNoteSelected: boolean = false;
	export let note: Note;
	export let bindButton: Record<string, HTMLButtonElement>;
</script>

<button
	class="grid grid-cols-[auto_1fr] 
				justify-items-start text-start 
				gap-x-[8px] py-2 pl-7 pr-2 
				{isNoteSelected ? 'bg-neutral-300 border-b-transparent rounded-md' : ''}
				focus:bg-amber-200 focus:border-b-transparent focus:rounded-md 
				last:border-b-0
				outline-none
				w-full"
	id={note.id}
	bind:this={bindButton[note.id]}
	aria-selected={isNoteSelected}
	role="tab"
	on:click
	on:focus
>
	<span class="font-bold col-span-2 truncate w-full">
		{note.name || 'New Note'}
	</span>
	<span class="font-normal text-xs">{dayjs(note.updated).format('DD.MM.YYYY')}</span>
	<span class="font-normal truncate w-full text-xs text-gray-500 tracking-wide"
		>{stripHtmlTags(extractSecondLine(note.content)) ?? 'No additional text'}</span
	>
</button>
