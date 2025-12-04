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

	let imagesLoaded = 0;
	let totalImages = 0;
	let allImagesLoaded = false;

	// 이미지 미리 로딩 함수
	function preloadImages() {
		totalImages = photos.length;
		imagesLoaded = 0;
		
		photos.forEach((photo, index) => {
			const img = new Image();
			img.onload = () => {
				imagesLoaded++;
				if (imagesLoaded === totalImages) {
					allImagesLoaded = true;
				}
			};
			img.onerror = () => {
				imagesLoaded++;
				if (imagesLoaded === totalImages) {
					allImagesLoaded = true;
				}
			};
			img.src = photo.src;
		});
	}

	onMount(() => {
		// 이미지 미리 로딩 시작
		preloadImages();

		// 현재 스크롤 위치 저장
		let savedScrollPosition = 0;
		
		// PhotoSwipe 초기화 (DOMContentLoaded 보장)
		const initPhotoSwipe = () => {
			const lightbox = new PhotoSwipeLightBox({
				gallery: '#gallery',
				children: 'a',
				showHideAnimationType: 'fade',
				pswpModule: PhotoSwipe,
				// GitHub Pages 호환성을 위한 핵심 설정
				returnFocus: false,
				trapFocus: false,
				closeOnVerticalDrag: true,
				preloadFirstSlide: true,
				bgOpacity: 0.8,
				spacing: 0.1,
				allowPanToNext: true,
				loop: true,
				escKey: true,
				arrowKeys: true,
				clickToCloseNonZoomable: true
			});

			// PhotoSwipe 초기화 후 링크 클릭 이벤트 재정의
			lightbox.on('uiRegister', () => {
				// 갤러리 링크들에 안전한 클릭 핸들러 추가
				const galleryElement = document.getElementById('gallery');
				if (galleryElement) {
					const galleryLinks = galleryElement.querySelectorAll('a');
					galleryLinks.forEach((link, index) => {
						// 기존 이벤트 리스너 제거 후 새로 추가
						const newLink = link.cloneNode(true) as HTMLElement;
						link.parentNode?.replaceChild(newLink, link);
						
						// PhotoSwipe 열기 이벤트 추가
						newLink.addEventListener('click', (e) => {
							e.preventDefault(); // 기본 링크 동작 차단
							e.stopPropagation();
							
							// PhotoSwipe 수동 열기
							lightbox.loadAndOpen(index);
						});
					});
				}
			});

			// 전역 히스토리 차단 설정
			let originalPushState: typeof history.pushState;
			let originalReplaceState: typeof history.replaceState;
			let originalOnPopState: typeof window.onpopstate;
			let historyBlocked = false;

			// PhotoSwipe 열기 전 완전 차단
			lightbox.on('beforeOpen', () => {
				// 스크롤 위치 저장
				savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
				
				// body 고정
				document.body.style.overflow = 'hidden';
				document.body.style.position = 'fixed';
				document.body.style.top = `-${savedScrollPosition}px`;
				document.body.style.width = '100%';
				document.body.style.height = '100%';

				// 히스토리 API 완전 차단
				if (!historyBlocked) {
					originalPushState = history.pushState;
					originalReplaceState = history.replaceState;
					originalOnPopState = window.onpopstate;

					// 히스토리 변경 완전 차단
					history.pushState = () => {};
					history.replaceState = () => {};
					window.onpopstate = (e) => {
						e.preventDefault();
						e.stopPropagation();
						return false;
					};

					historyBlocked = true;
				}
			});

			// PhotoSwipe 닫기 후 복원
			lightbox.on('close', () => {
				// 히스토리 API 복원
				if (historyBlocked && originalPushState && originalReplaceState) {
					history.pushState = originalPushState;
					history.replaceState = originalReplaceState;
					window.onpopstate = originalOnPopState;
					historyBlocked = false;
				}

				// body 스타일 복원
				document.body.style.overflow = '';
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.height = '';
				
				// 스크롤 위치 복원
				requestAnimationFrame(() => {
					window.scrollTo(0, savedScrollPosition);
				});
			});

			// 에러 처리 및 안전장치
			lightbox.on('destroy', () => {
				if (historyBlocked && originalPushState && originalReplaceState) {
					history.pushState = originalPushState;
					history.replaceState = originalReplaceState;
					window.onpopstate = originalOnPopState;
					historyBlocked = false;
				}
			});

			// PhotoSwipe 초기화
			lightbox.init();

			// 컴포넌트 언마운트 시 정리
			return () => {
				if (lightbox) {
					lightbox.destroy();
				}
				// 안전장치: 모든 변경사항 복원
				if (historyBlocked && originalPushState && originalReplaceState) {
					history.pushState = originalPushState;
					history.replaceState = originalReplaceState;
					window.onpopstate = originalOnPopState;
				}
				document.body.style.overflow = '';
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.height = '';
			};
		};

		// DOM이 완전히 로드된 후 초기화
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', initPhotoSwipe);
		} else {
			// 이미 로드된 경우 즉시 실행
			setTimeout(initPhotoSwipe, 0);
		}
	});

	const photos = [
		{
			src: photo24,
			width: 4000,
			height: 6000
		},
		{
			src: photo3,
			width: 4000,
			height: 6000
		},
		{
			src: photo1,
			width: 4000,
			height: 6000
		},
//////////////////////////////////////////////////////////////
		{
			src: photo2,
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
//////////////////////////////////////////////////////////////
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
			src: photo13,
			width: 1866,
			height: 2800
		},
//////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////
		{
			src: photo14,
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
//////////////////////////////////////////////////////////////
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
		{#if !allImagesLoaded}
			<div class="loading-indicator">
				<div class="loading-bar">
					<div class="loading-progress" style="width: {(imagesLoaded / totalImages) * 100}%"></div>
				</div>
				<p class="loading-text">이미지 로딩 중... ({imagesLoaded}/{totalImages})</p>
			</div>
		{/if}
	</div>
	<div id="gallery" class:loading={!allImagesLoaded}>
		{#each photos as photo, index}
			<a
				href={photo.src}
				class="slide"
				data-pswp-width={photo.width}
				data-pswp-height={photo.height}
				aria-label="갤러리 이미지 {index + 1} 보기"
			>
				<img class="thumbnail" src={photo.src} alt="갤러리 이미지 {index + 1}" loading="eager" />
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
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		cursor: pointer;
	}

	.slide:focus {
		outline: 2px solid #007acc;
		outline-offset: 2px;
	}

	.loading-indicator {
		text-align: center;
		margin-top: 1em;
		padding: 1em;
	}

	.loading-bar {
		width: 200px;
		height: 4px;
		background-color: #f0f0f0;
		border-radius: 2px;
		margin: 0 auto 0.5em;
		overflow: hidden;
	}

	.loading-progress {
		height: 100%;
		background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
		border-radius: 2px;
		transition: width 0.3s ease;
	}

	.loading-text {
		font-size: 0.9rem;
		color: #666;
		margin: 0;
	}

	#gallery.loading {
		opacity: 0.7;
		pointer-events: none;
	}

	#gallery:not(.loading) {
		transition: opacity 0.5s ease;
	}
</style>

