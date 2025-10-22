<script lang="ts">
	import { localeStore } from '../i18n.svelte';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { Github } from '@lucide/svelte';
	import finDeco from '$lib/assets/ring.png';

	const maxSectionHeight = 450;
	let sectionHeight = $state(maxSectionHeight);
	let coverLoaded = $state(false);

	function setSectionHeight() {
		sectionHeight = window.innerHeight < maxSectionHeight ? window.innerHeight : maxSectionHeight;
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
	});
</script>

<section style:height={`${sectionHeight}px`} class="cover" class:loaded={coverLoaded}>
</section>

<section class="fin">
	<p class="signature en">made by YoonSeo ♡</p>
	<a class="github-icon" href="https://github.com/HaileyYoon23" target="_blank"
		><Github size="1.1em" strokeWidth={1} /></a>
	<img class="fin-deco" src={finDeco} alt="" />
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
		transition: opacity 1.3s ease-in-out;
		/* Android WebKit 브라우저를 위한 하드웨어 가속 */
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		will-change: opacity;

		&.loaded {
			opacity: 1;
		}
	}
	.names-kr-box {
		position: absolute;
		top: 3em;
		left: 4em;

		span.names {
			color:rgb(254, 254, 254);
			display: block;
			font-size: 1.5rem;
			letter-spacing: 0.8em;
			line-height: 2;
		}
	}

	.cover-title-container {
		width: 100%;
		position: absolute;
		bottom: 1.5em;
	}

	.names-en-box {
		width: 100%;
		display: flex;
		justify-content: center;

		span.names {
			display: block;
			color: $white;
			word-spacing: 5px;
			font-size: 2.2rem;
		}
	}

	.event-date-and-place-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		span.event-date-and-time,
		span.event-place {
			display: block;
			color: $white;

			&.kr {
				font-size: 1rem;
			}

			&.en {
				font-size: 1.4rem;
			}
		}

		span.event-date-and-time.kr {
			margin-bottom: 0.4em;
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
		bottom: 2.5em;
		right: 3em;
		width: 6em;
		height: 6em;
	}

</style>
