<script lang="ts">
	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount, onDestroy } from 'svelte';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	// Gallery images
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

	// Thumbnail images
	import thumbnail1 from '$lib/assets/gallery/thumbnail/1.webp';
	import thumbnail2 from '$lib/assets/gallery/thumbnail/2.webp';
	import thumbnail3 from '$lib/assets/gallery/thumbnail/3.webp';
	import thumbnail4 from '$lib/assets/gallery/thumbnail/4.webp';
	import thumbnail5 from '$lib/assets/gallery/thumbnail/5.webp';
	import thumbnail6 from '$lib/assets/gallery/thumbnail/6.webp';
	import thumbnail7 from '$lib/assets/gallery/thumbnail/7.webp';
	import thumbnail8 from '$lib/assets/gallery/thumbnail/8.webp';
	import thumbnail13 from '$lib/assets/gallery/thumbnail/13.webp';
	import thumbnail14 from '$lib/assets/gallery/thumbnail/14.webp';
	import thumbnail15 from '$lib/assets/gallery/thumbnail/15.webp';
	import thumbnail16 from '$lib/assets/gallery/thumbnail/16.webp';
	import thumbnail17 from '$lib/assets/gallery/thumbnail/17.webp';
	import thumbnail18 from '$lib/assets/gallery/thumbnail/18.webp';
	import thumbnail19 from '$lib/assets/gallery/thumbnail/19.webp';
	import thumbnail20 from '$lib/assets/gallery/thumbnail/20.webp';
	import thumbnail21 from '$lib/assets/gallery/thumbnail/21.webp';
	import thumbnail22 from '$lib/assets/gallery/thumbnail/22.webp';
	import thumbnail23 from '$lib/assets/gallery/thumbnail/23.webp';
	import thumbnail24 from '$lib/assets/gallery/thumbnail/24.webp';
	import thumbnail25 from '$lib/assets/gallery/thumbnail/25.webp';
	import thumbnail26 from '$lib/assets/gallery/thumbnail/26.webp';
	import thumbnail27 from '$lib/assets/gallery/thumbnail/27.webp';
	import thumbnail28 from '$lib/assets/gallery/thumbnail/28.webp';
	import thumbnail29 from '$lib/assets/gallery/thumbnail/29.webp';
	import thumbnail30 from '$lib/assets/gallery/thumbnail/30.webp';

	let lightbox: PhotoSwipeLightBox | null = null;
	let observer: IntersectionObserver | null = null;
	
	// 썸네일용 저해상도 이미지 생성 (CSS로 처리)
	const createThumbnailSrc = (originalSrc: string) => {
		return originalSrc; // 원본을 사용하되 CSS로 크기 제한
	};

	onMount(() => {
		const gallery = document.querySelector('#gallery');

		// 🔒 페이지 새로고침 방지: PhotoSwipe 로딩 전 a 태그 클릭 보호
		if (gallery) {
			const anchors = gallery.querySelectorAll('a');
			anchors.forEach((a) => {
				a.addEventListener('click', (e) => {
					e.preventDefault(); // 클릭 → 절대 페이지 이동 금지
				});
			});
		}

		// 지연 로딩을 위한 Intersection Observer 설정
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement;
						const src = img.dataset.src;
						if (src && !img.src) {
							img.src = src;
							img.classList.remove('lazy');
							observer?.unobserve(img);
						}
					}
				});
			},
			{
				rootMargin: '30px' // 50px 전에 미리 로딩
			}
		);

		// 모든 lazy 이미지에 observer 적용
		const lazyImages = gallery?.querySelectorAll('img.lazy');
		lazyImages?.forEach((img) => observer?.observe(img));

		// PhotoSwipe 초기화 (메모리 최적화 옵션 추가)
		lightbox = new PhotoSwipeLightBox({
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'fade',
			pswpModule: PhotoSwipe,
			// 메모리 최적화 옵션들
			preload: [1, 1], // 현재 이미지 + 앞뒤 1개씩만 미리 로딩
			closeOnVerticalDrag: true,
			// 모바일 최적화
			pinchToClose: true,
			allowPanToNext: true,
			loop: true // 무한 루프 비활성화로 메모리 절약
		});

		// PhotoSwipe 이벤트 리스너 추가 (메모리 관리)
		lightbox.on('destroy', () => {
			// 메모리 정리
			if (typeof window !== 'undefined' && window.gc) {
				window.gc(); // 가비지 컬렉션 강제 실행 (개발 환경에서만)
			}
		});

		lightbox.init();

		// 메모리 사용량 모니터링 (개발 환경에서만)
		if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
			const memory = (window.performance as any).memory;
			console.log('Initial memory usage:', {
				used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
				total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB'
			});
		}
	});

	onDestroy(() => {
		// 컴포넌트 파괴 시 메모리 정리
		if (lightbox) {
			lightbox.destroy();
			lightbox = null;
		}
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	});

	// 이미지 메타데이터 (정적 import 사용)
	const photos = [
		{ src: photo24, thumbnail: thumbnail24, width: 4000, height: 6000 },
		{ src: photo3, thumbnail: thumbnail3, width: 4000, height: 6000 },
		{ src: photo1, thumbnail: thumbnail1, width: 4000, height: 6000 },
		{ src: photo2, thumbnail: thumbnail2, width: 4000, height: 6000 },
		{ src: photo4, thumbnail: thumbnail4, width: 4000, height: 6000 },
		{ src: photo5, thumbnail: thumbnail5, width: 4000, height: 6000 },
		{ src: photo6, thumbnail: thumbnail6, width: 4000, height: 6000 },
		{ src: photo7, thumbnail: thumbnail7, width: 4000, height: 6000 },
		{ src: photo13, thumbnail: thumbnail13, width: 1866, height: 2800 },
		{ src: photo15, thumbnail: thumbnail15, width: 1866, height: 2800 },
		{ src: photo16, thumbnail: thumbnail16, width: 1866, height: 2800 },
		{ src: photo17, thumbnail: thumbnail17, width: 1866, height: 2800 },
		{ src: photo19, thumbnail: thumbnail19, width: 1866, height: 2800 },
		{ src: photo20, thumbnail: thumbnail20, width: 2100, height: 2800 },
		{ src: photo21, thumbnail: thumbnail21, width: 1866, height: 2800 },
		{ src: photo14, thumbnail: thumbnail14, width: 1866, height: 2800 },
		{ src: photo18, thumbnail: thumbnail18, width: 1866, height: 2800 },
		{ src: photo8, thumbnail: thumbnail8, width: 4000, height: 6000 },
		{ src: photo22, thumbnail: thumbnail22, width: 1866, height: 2800 },
		{ src: photo23, thumbnail: thumbnail23, width: 4000, height: 6000 },
		{ src: photo25, thumbnail: thumbnail25, width: 5570, height: 4557 },
		{ src: photo26, thumbnail: thumbnail26, width: 4974, height: 3880 },
		{ src: photo27, thumbnail: thumbnail27, width: 4825, height: 4256 },
		{ src: photo28, thumbnail: thumbnail28, width: 4672, height: 7008 },
		{ src: photo29, thumbnail: thumbnail29, width: 4000, height: 6000 },
		{ src: photo30, thumbnail: thumbnail30, width: 4000, height: 6000 }
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
			>
				<img 
					class="thumbnail lazy" 
					data-src={photo.thumbnail}
					alt="" 
					loading="lazy" 
					decoding="async"
					style="background-color: #f0f0f0;"
				/>
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
		transition: opacity 0.3s ease;
		
		&.lazy {
			opacity: 0;
			background-color: #f0f0f0;
			
			&:not([src]) {
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23e0e0e0'%3E%3Cpath d='M20 30c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0-18c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z'/%3E%3Cpath d='M20 22c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/%3E%3C/g%3E%3C/svg%3E");
				background-repeat: no-repeat;
				background-position: center;
				background-size: 24px 24px;
			}
		}
		
		&:not(.lazy) {
			opacity: 1;
		}
	}

	.slide {
		grid-row: span 2;
	}
</style>