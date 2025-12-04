<script lang="ts">
	import { localeStore } from '../i18n.svelte';
	import { browser } from '$app/environment';
	import { Confetti } from 'svelte-confetti';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import 'animate.css';
	import roaCat from '$lib/assets/etc/roa_pic.webp';
	import hanaCat from '$lib/assets/etc/hana_pic.webp';

	const maxSectionHeight = 900;
	let sectionHeight = $state(maxSectionHeight);
	let coverLoaded = $state(false);
	let imageVisible = $state(true);

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

		// 3초 후 이미지 숨기기 (bounceOutUp 애니메이션 완료 후)
		setTimeout(() => {
			imageVisible = false;
		}, 3500);
	});
</script>

<section style:height={`${sectionHeight}px`} class="cover" class:loaded={coverLoaded}>
	{#if imageVisible}
		<img src={roaCat} alt="로아" class="animate__animated roa_cat" />
		<img src={hanaCat} alt="한아" class="animate__animated hana_cat" />
	{/if}
	<div class="confetti-area">
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			colorArray={['#588adb', '#f5e298', '#fff', '#9aa3f5']}
			delay={[500, 2000]}
			infinite
			duration={4500}
			amount={150}
			fallDistance={`${sectionHeight+300}px`}
		/>
	</div>

	<div class="names-kr-box">
		<span class="names kr">류동현</span>
		<span class="names kr">그리고</span>
		<span class="names kr">나윤서</span>
	</div>

	<div class="cover-title-container">
		<div class="names-en-box">
			<span class="names en-sacramento">DongHyun & YoonSeo</span>
		</div>

		<div class="event-date-and-place-box">
			<span class="event-date-and-time {localeStore.locale}">{$_('cover.date')}</span>
			<span class="event-place {localeStore.locale}">{$_('cover.place')}</span>
		</div>
	</div>
</section>

<style lang="scss">
	.roa_cat {
		position: absolute;
		margin: 0 0.5rem;
		z-index: 1;
		animation: bounceOutUp; /* referring directly to the animation's @keyframe declaration */
		animation-duration: 3.5s; /* don't forget to set a duration! */
	}
	.hana_cat {
		position: absolute;
		margin: 0 0.5rem;
		margin-top: 20rem;
		z-index: 1;
		animation: bounceOutDown; /* referring directly to the animation's @keyframe declaration */
		animation-duration: 3.5s; /* don't forget to set a duration! */
	}
	.animate__animated.animate__bounce {
		--animate-duration: 2s;
	}

	:root {
		--animate-duration: 800ms;
		--animate-delay: 0.9s;
	}
	section.cover {
		position: relative;
		background-image: url('/src/lib/assets/cover.webp');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
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
	.confetti-area {
		position: absolute;
		top: -50px;
		left: -50px;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		pointer-events: none;
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
			font-size: 3rem;
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
				font-size: 1.3rem;
			}

			&.en {
				font-size: 1.4rem;
			}
		}

		span.event-date-and-time.kr {
			margin-bottom: 0.4em;
		}
	}
</style>
