<script lang="ts">
	import { setAssetPath } from '@esri/calcite-components/dist/components';
	import '@esri/calcite-components/dist/components/calcite-button';
	import '@esri/calcite-components/dist/components/calcite-icon';
	import '@esri/calcite-components/dist/components/calcite-date-picker';
	import '@esri/calcite-components/dist/components/calcite-loader';

	import '@esri/calcite-components/dist/calcite/calcite.css';

	setAssetPath("https://cdn.jsdelivr.net/npm/@esri/calcite-components@3.0.0-next.113/dist/calcite/assets");
</script>

<h1>
	Welcome to SvelteKit
	<calcite-icon icon="banana"></calcite-icon>
</h1>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<calcite-date-picker range></calcite-date-picker>
<calcite-button>My button</calcite-button>
