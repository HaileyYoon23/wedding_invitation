<script lang="ts">
	import photo1 from '$lib/assets/gallery2/1.jpg';
	import photo2 from '$lib/assets/gallery2/2.jpg';
	import photo3 from '$lib/assets/gallery2/3.jpg';
	import photo4 from '$lib/assets/gallery2/4.jpg';
	import photo5 from '$lib/assets/gallery2/5.jpg';
	import photo6 from '$lib/assets/gallery2/6.jpg';
	import photo7 from '$lib/assets/gallery2/7.jpg';
	import photo8 from '$lib/assets/gallery2/8.jpg';
	import photo13 from '$lib/assets/gallery2/13.jpg';
	import photo14 from '$lib/assets/gallery2/14.jpg';
	import photo15 from '$lib/assets/gallery2/15.jpg';
	import photo16 from '$lib/assets/gallery2/16.jpg';
	import photo17 from '$lib/assets/gallery2/17.jpg';
	import photo18 from '$lib/assets/gallery2/18.jpg';
	import photo19 from '$lib/assets/gallery2/19.jpg';
	import photo20 from '$lib/assets/gallery2/20.jpg';
	import photo21 from '$lib/assets/gallery2/21.jpg';
	import photo22 from '$lib/assets/gallery2/22.jpg';
	import photo23 from '$lib/assets/gallery2/23.jpg';
	import photo24 from '$lib/assets/gallery2/24.jpg';
	import photo25 from '$lib/assets/gallery2/25.jpg';
	import photo26 from '$lib/assets/gallery2/26.jpg';
	import photo27 from '$lib/assets/gallery2/27.jpg';
	import photo28 from '$lib/assets/gallery2/28.jpg';
	import photo29 from '$lib/assets/gallery2/29.jpg';
	import photo30 from '$lib/assets/gallery2/30.jpg';

	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	onMount(() => {
		const lightbox = new PhotoSwipeLightBox({
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'fade',
			pswpModule: PhotoSwipe
		});

		lightbox.init();
	});

	const photos = [
		{
			src: photo1,
			width: 4000,
			height: 6000
		},
		{
			src: photo24,
			width: 2000,
			height: 3000
		},
		{
			src: photo2,
			width: 4000,
			height: 6000
		},
		{
			src: photo3,
			width: 4000,
			height: 6000
		},
		{
			src: photo4,
			width: 1185,
			height: 1778
		},
		{
			src: photo5,
			width: 4000,
			height: 6000
		},
		{
			src: photo6,
			width: 4000,
			height: 6000
		},
		{
			src: photo7,
			width: 1185,
			height: 1778
		},
		{
			src: photo13,
			width: 1866,
			height: 2800
		},
		{
			src: photo14,
			width: 1866,
			height: 2800
		},
		{
			src: photo15,
			width: 1866,
			height: 2800
		},
		{
			src: photo16,
			width: 1866,
			height: 2800
		},
		{
			src: photo17,
			width: 1866,
			height: 2800
		},
		{
			src: photo18,
			width: 1866,
			height: 2800
		},
		{
			src: photo8,
			width: 4000,
			height: 6000
		},
		{
			src: photo19,
			width: 933,
			height: 1400
		},
		{
			src: photo20,
			width: 1050,
			height: 1400
		},
		{
			src: photo21,
			width: 1866,
			height: 2800
		},
		{
			src: photo22,
			width: 1866,
			height: 2800
		},
		{
			src: photo23,
			width: 4000,
			height: 6000
		},
		{
			src: photo25,
			width: 5570,
			height: 4557
		},
		{
			src: photo26,
			width: 4974,
			height: 3880
		},
		{
			src: photo27,
			width: 4825,
			height: 4256
		},
		{
			src: photo28,
			width: 2336,
			height: 3504
		},
		{
			src: photo29,
			width: 4000,
			height: 6000
		},
		{
			src: photo30,
			width: 4000,
			height: 6000
		}
	];
</script>

<section class="gallery">
	<div class="header">
		<h2 class="title {localeStore.locale}">{$_('gallery.title')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('gallery.sub_title')}</p>
	</div>
	<div id="gallery">
		{#each photos as photo}
			<a
				href={photo.src}
				class="slide"
				data-pswp-width={photo.width}
				data-pswp-height={photo.height}
				target="_blank"
			>
				<img class="thumbnail" src={photo.src} alt="" />
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	section.gallery {
		padding: 4.5em 2em 2em 2em;
		background-color: $white;
	}

	.header {
		margin-bottom: 2em;
	}

	h2.title {
		text-align: center;
		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		text-align: center;
		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}

		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	#gallery {
		display: grid;
		gap: 3px;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 4.5em;
	}

	img.thumbnail {
		border-radius: 2px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.slide {
		grid-row: span 2;
	}
</style>
