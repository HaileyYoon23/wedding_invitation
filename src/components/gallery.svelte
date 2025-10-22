<script lang="ts">
	import photo1 from '$lib/assets/gallery/1.webp';
	import photo2 from '$lib/assets/gallery/2.webp';
	import photo3 from '$lib/assets/gallery/3.webp';
	import photo4 from '$lib/assets/gallery/4.webp';
	import photo5 from '$lib/assets/gallery/5.webp';
	import photo6 from '$lib/assets/gallery/6.webp';
	import photo7 from '$lib/assets/gallery/7.webp';
	import photo8 from '$lib/assets/gallery/8.webp';
	import photo9 from '$lib/assets/gallery/9.webp';
	import photo10 from '$lib/assets/gallery/10.webp';
	import photo11 from '$lib/assets/gallery/11.webp';
	import photo12 from '$lib/assets/gallery/12.webp';

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
			width: 4000,
			height: 6000
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
			width: 4000,
			height: 6000
		},
		{
			src: photo8,
			width: 3024,
			height: 4032
		},
		{
			src: photo9,
			width: 4284,
			height: 4284
		},
		{
			src: photo10,
			width: 4032,
			height: 3024
		},
		{
			src: photo11,
			width: 3024,
			height: 3024
		},
		{
			src: photo12,
			width: 4284,
			height: 5712
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
		gap: 0.5em;
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
