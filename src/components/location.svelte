<script lang="ts">
	import locationTopWave from '$lib/assets/location-top-wave.svg';
	import locationDeco from '$lib/assets/location-deco.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, Github } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let mapContainer: HTMLElement;
	let showCopyModal = $state(false);

	function copyAddress() {
		navigator.clipboard
			.writeText('서울 송파구 올림픽로 319 3층')
			.then(() => {
				showCopyModal = true;
				setTimeout(() => {
					showCopyModal = false;
				}, 1300);
			})
			.catch(() => null);
	}

	onMount(() => {
		// Kakao Maps 스크립트 로드
		const script = document.createElement('script');
		script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=5fb1510d2c5d6e295def723502664492&autoload=false';
		script.onload = () => {
			// @ts-ignore
			window.kakao.maps.load(() => {
				const options = {
					// @ts-ignore
					center: new window.kakao.maps.LatLng(37.515711, 127.105725),
					level: 4,
					draggable: false,
					zoomable: false,
				};
				// @ts-ignore
				const map = new window.kakao.maps.Map(mapContainer, options);
				
				// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
				//const mapTypeControl = new window.kakao.maps.MapTypeControl();

				// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
				//map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

				// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
				//const zoomControl = new window.kakao.maps.ZoomControl();
				//map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);


				// 마커 추가
				// @ts-ignore
				const markerPosition = new window.kakao.maps.LatLng(37.515711, 127.105725);
				// @ts-ignore
				const marker = new window.kakao.maps.Marker({
					position: markerPosition,
					clickable: true
				});
				marker.setMap(map);

				// 마커 클릭 이벤트 추가
				// @ts-ignore
				window.kakao.maps.event.addListener(marker, 'click', function() {
					// 카카오맵 사이트로 이동
					window.open('https://place.map.kakao.com/17651361');
				});
			});
		};
		document.head.appendChild(script);
	});
</script>
<img src={locationTopWave} class="location-top-wave" alt="" />
<section class="location">
	<h2 class="title {localeStore.locale}">{$_('location.title')}</h2>
	<p class="venue en">더컨벤션 잠실, 3F 아모르홀</p>
	<button class="copy-address en" onclick={copyAddress}>
		<span class="clipboard-icon">
			<Clipboard size="1.1em" />
		</span>
		<span class="address">서울 송파구 올림픽로 319 3층</span></button
	>
	<div class="map" bind:this={mapContainer}></div>
	<p class="signature en">made ♡ by Yoonseo</p>
	<a class="github-icon" href="https://github.com/HaileyYoon23" target="_blank"
		><Github size="1.1em" strokeWidth={1} /></a
	>
	<img class="location-deco" src={locationDeco} alt="" />
</section>

<!-- Copy Success Modal -->
{#if showCopyModal}
	<div class="copy-modal" class:show={showCopyModal}>
		<div class="modal-content">
			<p class="{localeStore.locale}">
				{$_('location.address_copied')}
			</p>
		</div>
	</div>
{/if}

<style lang="scss">
	img.location-top-wave {
		max-width: $content-max-width;
		margin: auto;
	}

	section.location {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		background-color: $bg-color-1;
		padding: 1em 2em 1em 2em;
	}

	h2.title {
		color: $primary-color;
		text-align: center;
		margin-bottom: 1em;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	p.venue {
		&.en {
			font-size: 1.1rem;
		}
	}

	button.copy-address {
		display: flex;
		align-items: center;
		margin-top: 0.5em;

		.clipboard-icon {
			height: 1em;
			display: inline-block;
			margin-right: 0.2em;
			color: $font-color-default;
		}

		.address {
			display: inline-block;
			font-size: 1.2rem;
			text-decoration: underline;
		}
	}

	.map {
		margin-top: 2em;
		width: 100%;
		height: 16em;
		margin-bottom: 7em;
		border-radius: 8px;
		overflow: hidden;
	}

	iframe.google-maps {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	p.signature {
		font-size: 1rem;
	}
	.github-icon {
		margin-top: 0.2em;
		color: $font-color-default;
		cursor: pointer;
	}

	img.location-deco {
		position: absolute;
		bottom: 2.5em;
		right: 1.5em;
	}

	.copy-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		pointer-events: none;

		&.show {
			opacity: 1;
			animation: fadeInOut 1.3s ease-in-out forwards;
		}

		.modal-content {
			background: rgba(24, 24, 24, 0.8);
			color: white;
			padding: 1rem 1.5rem;
			border-radius: 8px;
			box-shadow: 0 4px 12px rgb(255, 255, 255);
			backdrop-filter: blur(10px);

			p {
				margin: 0;
				text-align: center;
				color: white;
				
				&.kr {
					font-size: 0.9rem;
					font-weight: 500;
				}

				&.en {
					font-size: 1rem;
					font-weight: 600;
				}
			}
		}
	}

	@keyframes fadeInOut {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.9);
		}
		15% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
		85% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.9);
		}
	}
</style>
