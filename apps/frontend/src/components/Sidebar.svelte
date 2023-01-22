<script lang="ts">
	import { formatDate } from '../utils/format-date';

	let selected = 0;

	export let notes = [
		{ name: 'name', date: new Date(), content: 'The application is divided' },
		{ name: 'name2', date: new Date(), content: 'The application is divided' },
		{ name: 'name3', date: new Date(), content: 'The application is divided' },
		{ name: 'name4', date: new Date(), content: 'The application is divided' },
		{ name: 'name5', date: new Date(), content: 'The application is divided' }
	];
</script>

<div class="w-1/4 border-r border-r-gray-300 pl-3 pr-3 pt-5 min-h-screen" role="tablist">
	{#each notes as note, i}
		<button
			class="grid grid-cols-[auto_1fr] 
      justify-items-start text-start 
      gap-x-[8px] py-2 pl-7 pr-2 
      {selected === i ? 'bg-neutral-300 border-b-transparent rounded-md' : ''}
      focus:bg-amber-200 focus:border-b-transparent focus:rounded-md 
      last:border-b-0
      outline-none
      w-full"
			id={note.name}
			aria-selected={selected === i}
			role="tab"
			on:click={() => (selected = i)}
			on:focus={() => (selected = i)}
		>
			<span class="font-bold col-span-2 truncate w-full">{note.name}</span>
			<span class="font-normal text-xs">{formatDate(note.date)}</span>
			<span class="font-normal truncate w-full text-xs text-gray-500">{note.content}</span>
		</button>

		{#if selected === i + 1 || selected === i}
			<div class="border-b  border-b-transparent" />
		{:else}
			<div class="border-b w-[95%] ml-auto border-b-gray-300" />
		{/if}
	{/each}
</div>
