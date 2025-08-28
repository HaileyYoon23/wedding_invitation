<script lang="ts">
	import Calendar from '../components/calendar.svelte';
	import Letter from '../components/letter.svelte';
	import Rsvp from '../components/rsvp.svelte';
	import Cover from '../components/cover.svelte';
	import Location from '../components/location.svelte';
	import type { PageProps } from './$types';
	import Gallery from '../components/gallery.svelte';

	let { form }: PageProps = $props();
</script>

<Cover />
<Letter />
<Rsvp {form} />
<Gallery />
<Calendar />
<Location />
