<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>

<div class="app">
	<slot />
</div>

<style lang="scss">
	.app {
		min-height: 100vh;
		width: 100%;
		height: 100%;
		background-color: #feffff;
	}
</style>
