<script lang="ts">
	import { Game } from "./game";

	const game = new Game();
</script>

<main>
	{#each game.coloredBoard as row}
		{#each row as color}{/each}
	{/each}
</main>

<style>
	.game {
		display: grid;
		zoom: 100%;
		grid-template-columns: repeat(var(--word-length), 100px);
		grid-template-rows: repeat(var(--max-guesses), 100px);
		gap: 10px;
		/* aspect-ratio: 1/1; */
		/* height: 500px; */
		justify-content: center;
		align-content: center;
		/* margin-bottom: 20px; */
	}
</style>
