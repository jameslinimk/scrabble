<script lang="ts">
	import Testing from "./components/Testing.svelte";
	import { gameWritable } from "./ts/game";
	import { ioWritable } from "./ts/io";

	let io = $ioWritable;
	setInterval(() => {
		const start = Date.now();
		io.volatile.emit("ping", () => ($gameWritable.latency = Date.now() - start));
	}, 5000);
</script>

<main>
	<Testing />

	<div class="game" style="--row-length: {$gameWritable.board.length}; --column-length: {$gameWritable.board.length};">
		{#each $gameWritable.coloredBoard as row, y}
			{#each row as color, x}
				<div class="box" style="--color: {color};">
					{#if $gameWritable.board[y][x] == "center"}
						<svg
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							width="36.09px"
							height="36.09px"
							viewBox="0 0 36.09 36.09"
							style="enable-background:new 0 0 36.09 36.09;"
							xml:space="preserve"
						>
							<g>
								<path
									d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
							s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
							l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
							c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
							l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957
							l2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957
							l-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592
							l9.87,1.002L25.336,21.598z"
								/>
							</g>
						</svg>
					{:else if $gameWritable.board[y][x] !== "empty"}
						{$gameWritable.multiplierToWord({ x, y })} score
					{/if}
					<!-- <div class="boxMultiplier">3</div> -->
				</div>
			{/each}
		{/each}
	</div>
</main>

<style>
	.game {
		display: grid;
		grid-template-columns: repeat(var(--row-length), 50px);
		grid-template-rows: repeat(var(--column-length), 50px);
		gap: 5px;
		background-color: black;
		padding: 10px;
		/* aspect-ratio: 1/1; */
		/* height: 500px; */
		justify-content: center;
		align-content: center;
		/* margin-bottom: 20px; */
	}

	.box {
		background-color: var(--color);
		position: relative;

		padding-top: 6px;
		text-align: center;

		color: #ffe8d6;
		font-size: small;
	}

	/* .boxMultiplier {
		position: absolute;
		top: -1px;
		left: 1px;
		font-size: 50%;
	} */
</style>
