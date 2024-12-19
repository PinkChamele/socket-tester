<script>
	import JsonItem from './json-item.svelte';

	export let data;

</script>

<div class="json">
	<JsonItem key="" {data} isLast={true} indent={0} />
</div>

<style>
    .json {
        font-family: monospace;

        background-color: var(--main-textarea-background);

        border: solid 1px var(--main-textarea-border);

        padding: 5px;
        border-radius: 5px;
        max-width: 100%;
    }

    .json > .json_item {
        display: block;
    }
</style>
