<script lang="ts">
	import { localeStore } from '../i18n.svelte';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import { onMount, onDestroy } from 'svelte';
	import { Github } from '@lucide/svelte';
	import finDeco from '$lib/assets/ring.png';

	const maxSectionHeight = 450;
	let sectionHeight = $state(maxSectionHeight);
	let coverLoaded = $state(false);
	let showFamilyImage = $state(false);

	function setSectionHeight() {
		sectionHeight = window.innerHeight < maxSectionHeight ? window.innerHeight : maxSectionHeight;
	}

	function handleScroll() {
		if (!browser) return;
		
		const scrollPosition = window.scrollY;
		const documentHeight = document.documentElement.scrollHeight;
		const windowHeight = window.innerHeight;
		const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
		
		// 맨 아래에서 200px 근처에 있는지 확인
		showFamilyImage = distanceFromBottom <= 180;
	}

	if (browser && window.matchMedia('(max-width: 1024px)')) {
		setSectionHeight();
	}

	onMount(() => {
		// Android에서 렌더링을 강제로 기다린 후 페이드인 시작
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setTimeout(() => {
					coverLoaded = true;
				}, 50);
			});
		});

		// 스크롤 이벤트 리스너 추가
		if (browser) {
			window.addEventListener('scroll', handleScroll, { passive: true });
			// 초기 스크롤 위치 확인
			handleScroll();
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<section style:height={`${sectionHeight}px`} class="cover" class:loaded={coverLoaded} class:family-image={showFamilyImage}>
</section>

<section class="fin">
	<p class="signature en">made by YoonSeo ♡</p>
	<a class="github-icon" href="https://github.com/HaileyYoon23" target="_blank"
		><Github size="1.1em" strokeWidth={1} /></a>
	
</section>

<style lang="scss">
	section.cover {
		position: relative;
		background-image: url('/src/lib/assets/draw.webp');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: contain; /* Change from 'cover' to 'contain' to make it smaller */
		/* Or use a specific size like: background-size: 80%; */
		opacity: 0;
		transition: opacity 1.3s ease-in-out, background-image 0.5s ease-in-out;
		/* Android WebKit 브라우저를 위한 하드웨어 가속 */
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		will-change: opacity, background-image;

		&.loaded {
			opacity: 1;
		}

		&.family-image {
			background-image: url('/src/lib/assets/etc/family.jpg');
		}
	}

	section.fin {
		position: relative;
		background-color: $bg-color-1;
		padding: 1em 2em 1em 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img.fin-deco {
		position: absolute;
		bottom: 1em;
		right: 0.5em;
		width: 7em;
		height: 7em;
	}

</style>
