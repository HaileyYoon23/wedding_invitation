<script lang="ts">
	import photo1 from '$lib/assets/gallery/1.webp';
	import photo2 from '$lib/assets/gallery/2.webp';
	import photo3 from '$lib/assets/gallery/3.webp';
	import photo4 from '$lib/assets/gallery/4.webp';
	import photo5 from '$lib/assets/gallery/5.webp';
	import photo6 from '$lib/assets/gallery/6.webp';
	import photo7 from '$lib/assets/gallery/7.webp';
	import photo8 from '$lib/assets/gallery/8.webp';
	import photo13 from '$lib/assets/gallery/13.webp';
	import photo14 from '$lib/assets/gallery/14.webp';
	import photo15 from '$lib/assets/gallery/15.webp';
	import photo16 from '$lib/assets/gallery/16.webp';
	import photo17 from '$lib/assets/gallery/17.webp';
	import photo18 from '$lib/assets/gallery/18.webp';
	import photo19 from '$lib/assets/gallery/19.webp';
	import photo20 from '$lib/assets/gallery/20.webp';
	import photo21 from '$lib/assets/gallery/21.webp';
	import photo22 from '$lib/assets/gallery/22.webp';
	import photo23 from '$lib/assets/gallery/23.webp';
	import photo24 from '$lib/assets/gallery/24.webp';
	import photo25 from '$lib/assets/gallery/25.webp';
	import photo26 from '$lib/assets/gallery/26.webp';
	import photo27 from '$lib/assets/gallery/27.webp';
	import photo28 from '$lib/assets/gallery/28.webp';
	import photo29 from '$lib/assets/gallery/29.webp';
	import photo30 from '$lib/assets/gallery/30.webp';

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

	const w = 2709;
	const h = 4064;

	const photos = [
		{
			src: photo1,
			width: w,
			height: h
		},
		{
			src: photo24,
			width: 4000,
			height: 6000
		},
		{
			src: photo2,
			width: w,
			height: h
		},
		{
			src: photo3,
			width: w,
			height: h
		},
		{
			src: photo4,
			width: w,
			height: h
		},
		{
			src: photo5,
			width: w,
			height: h
		},
		{
			src: photo6,
			width: w,
			height: h
		},
		{
			src: photo7,
			width: w,
			height: h
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
			width: 1866,
			height: 2800
		},
		{
			src: photo20,
			width: 2100,
			height: 2800
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
			width: 4672,
			height: 7008
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
