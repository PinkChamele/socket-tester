<script>
	export let key;
	export let data;
	export let indent = 0;
	export let isLast = false;

	const type = typeof data;
	const isObject = type === 'object' && data !== null;
	const isArray = Array.isArray(data);
	const braces = isArray ? '[]' : '{}';
	const itemCount = isArray ? data.length : Object.keys(data || {}).length;
	let expanded = indent < 2; // Initially expanded if within first two levels

	// Toggle the expanded state for collapsible items
	function toggle() {
		expanded = !expanded;
	}
</script>

<div class="json_item json_item_collapsible" class:json_item_expanded={expanded} style="margin-left: {indent * 16}px;">
	{#if isObject}
		<div
			class="json_collapsible_marker"
			on:click={toggle}
			json_brace_close={braces[1]}
			count={itemCount}
		>
			{#if key}
				<span class="json_key">{key}:</span>
			{/if}
			{braces[0]}{expanded ? '' : '...'}
		</div>

		{#if expanded}
			<div class="json_value_object">
				{#each Object.entries(data || {}) as [childKey, childValue], index}
					<svelte:self key={isArray ? '' : childKey} data={childValue} indent={indent + 1} isLast={index === itemCount - 1} />
				{/each}
			</div>
			<div>{braces[1]}{isLast ? '' : ','}</div>
		{/if}
	{:else}
		<div class="json_item">
			{#if key}
				<span class="json_key">{key}:</span>
			{/if}
			<span class="json_value json_value_{type}">
        {type === 'string' ? `"${data}"` : data}{isLast ? '' : ','}
      </span>
		</div>
	{/if}
</div>

<style>
    .json_item {
        line-height: 1.2rem;
        display: block;
    }
    .json_item_collapsible {
        overflow: hidden;
        position: relative;
    }
    .json_collapsible_marker {
        cursor: pointer;
    }
    .json_value_object {
        position: relative;
    }
    .json_item_expanded > .json_collapsible_marker::after {
        content: '⌄';
        font-size: 80%;
        padding: 0px 4px;
        background-color: var(--input-background);
        border-radius: 5px;
        color: var(--main-text-inactive);
    }
    .json_collapsible_marker::before {
        content: attr(count);
        font-size: 80%;
        padding: 0px 4px;
        background-color: var(--input-background);
        border-radius: 5px;
        color: var(--main-text-inactive);
    }
    .json_collapsible_marker::after {
        content: attr(json_brace_close);
    }
    .json_key {
        color: var(--json-key-color);
    }
    .json_value_string {
        color: var(--json-string-color);
    }
    .json_value_number {
        color: var(--json-number-color);
    }
    .json_value_boolean {
        color: var(--json-boolean-color);
    }
</style>
