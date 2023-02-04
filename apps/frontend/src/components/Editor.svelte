<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import HeadingExtension from '@tiptap/extension-heading';
	import dayjs from 'dayjs';
	import { notesStore, type Note } from '../stores/notes';
	import { extractFirstLine } from '../utils/extractFirstLine';
	import { updated } from '$app/stores';

	export let selectedNoteId: string | undefined;
	let prevSelectedNoteId: string | undefined;

	let selectedNote: Note | undefined;
	$: selectedNote = $notesStore.find((note) => note.id === selectedNoteId);

	$: if (prevSelectedNoteId !== selectedNoteId && selectedNote) {
		editor?.commands?.setContent(selectedNote.content);
		prevSelectedNoteId = selectedNoteId;
	}

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, HeadingExtension],
			content: selectedNote?.content ?? '<h1></h1>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: () => {
				if (selectedNoteId) {
					notesStore.updateNote(selectedNoteId, {
						name: extractFirstLine(editor.getText()),
						content: editor.getHTML()
					});
				}
			},
			editorProps: {
				attributes: {
					class: 'w-full min-w-full h-full m-0 p-5 focus:outline-none prose prose-sm sm:prose'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="flex flex-col items-center w-full pt-5 h-full overflow-scroll">
	<span class="text-xs text-gray-500 font-normal tracking-wider">
		Edited: {dayjs(selectedNote.updated).format('DD MMMM YYYY, HH:MM')}
	</span>
	<div class="w-full h-full" bind:this={element} />
</div>
