<script lang="ts">
	import { Accordion, type AccordionItem } from 'melt/builders';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { slide } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';
	import { type Snippet } from 'svelte';

	type Item = AccordionItem<{
		title: string;
	}>;


	const items: Item[] = [
		{ id: '1', title: $_('rsvp.accordion.how_to_come') },
		{ id: '2', title: $_('rsvp.accordion.the_menu') }
	];
	

	const accordion = new Accordion({
		multiple: true
	});

	const howToComeItem = accordion.getItem(items[0]);
	const menuItem = accordion.getItem(items[1]);
</script>

{#snippet accordionItem(item: ReturnType<Accordion['getItem']>, content: Snippet)}
	<div class="item">
		<div {...item.heading} class="heading">
			<button {...item.trigger} class="trigger {localeStore.locale}">
				{item.item.title}
				<div class="chevron-down-container {localeStore.locale}" class:rotate={item.isExpanded}>
					<ChevronDown strokeWidth={1.25} />
				</div>
			</button>
			
		</div>

		{#if item.isExpanded}
			<div
				{...item.content}
				class="content {localeStore.locale}"
				transition:slide={{ duration: 150 }}
			>
				{@render content()}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet howToComeContent()}
	<p class="subway content-title">{$_('rsvp.accordion.subway')}</p>
	<p class="subway-list">{$_('rsvp.accordion.subway_list')}</p>
	<p class="bus content-title">{$_('rsvp.accordion.bus')}</p>
	<p class="bus-list-1">{$_('rsvp.accordion.bus_list_1')}</p>
	<p class="bus-list-2">{$_('rsvp.accordion.bus_list_2')}</p>
	<p class="bus-list-3">{$_('rsvp.accordion.bus_list_3')}</p>
	<p class="bus-list-4">{$_('rsvp.accordion.bus_list_4')}</p>
{/snippet}

{#snippet menuContent()}
	<p class="menu-title">{$_('rsvp.accordion.menu_title')}</p>
	<p class="beef">{$_('rsvp.accordion.beef')}</p>
	<p>&</p>
	<p class="fish">{$_('rsvp.accordion.fish')}</p>
	<p class="vegetarian">
		{$_('rsvp.accordion.vegetarian')}
	</p>
{/snippet}

<div class="accordion-root" {...accordion.root}>
	{@render accordionItem(howToComeItem, howToComeContent)}
	{@render accordionItem(menuItem, menuContent)}
</div>

<style lang="scss">
	.accordion-root {
		width: 100%;
	}

	.item {
		margin-bottom: 1em;
	}

	.heading {
		border-top: 1px solid $primary-color-light;
		position: relative;
	}

	button.trigger {
		color: $primary-color;
		width: 100%;

		&.en {
			letter-spacing: 1px;
			font-weight: 600;
			font-size: 1.3rem;
			padding: 0.6em 0;
		}

		&.kr {
			letter-spacing: 1px;
			font-weight: 500;
			font-size: 1.1rem;
			padding: 0.8em 0;
		}
	}

	.chevron-down-container {
		position: absolute;
		width: 1.5em;
		height: 1.5em;
		right: 0.6em;
		color: $primary-color;
		transition: transform 350ms ease;

		&.en {
			top: 1.05em;
		}

		&.kr {
			top: 0.9em;
		}

		&.rotate {
			transform: rotate(180deg);
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5em 0.5em 1em 0.5em;

		p {
			text-align: center;
		}

		&.kr p {
			font-size: 0.9rem;

			&:not(:last-child) {
				margin-bottom: 2.5em;
			}

			&.content-title {
				font-family: '나눔고딕', sans-serif;
				margin-bottom: 0.5em;
				font-weight: 800;
			}


			&.subway-list,
			&.bus-list-1,
			&.bus-list-2,
			&.bus-list-3,
			&.bus-list-4 {
				font-family: '나눔고딕', sans-serif;
			}
		}
	}
</style>
