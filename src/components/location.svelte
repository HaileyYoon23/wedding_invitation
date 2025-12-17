<script lang="ts">
	import locationTopWave from '$lib/assets/location-top-wave.svg';
	import kakaomapIcon from '$lib/assets/etc/kakaomap.png';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard } from '@lucide/svelte';
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

	function startNavigation() {
		// @ts-ignore
		if (window.Kakao && window.Kakao.Navi) {
			// @ts-ignore
			window.Kakao.Navi.start({
				name: '더컨벤션 잠실',
				x: 127.105725,
				y: 37.515711,
				coordType: 'wgs84',
			});
		} else {
			// Kakao SDK가 로드되지 않은 경우 카카오맵 웹사이트로 이동
			window.open('https://kko.to/HABe17A8YV');
		}
	}

	function startTmapNavigation() {
		const destination = {
			name: '더컨벤션 잠실',
			lat: 37.515711,
			lng: 127.105725
		};

		const tmapAppUrl = `https://apis.openapi.sk.com/tmap/app/routes?appKey=l7xx7179ddde21ca4bfb8e6b03c710138f41&name=${destination.name}&lon=${destination.lng}&lat=${destination.lat}`;
		
		// 모바일에서 앱 스킴 시도
		if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			// 앱이 설치되어 있지 않을 경우를 대비한 타이머
			const startTime = Date.now();
			const timeout = setTimeout(() => {
				// 앱이 열리지 않았다면 웹 버전으로 이동
				if (Date.now() - startTime < 2000) {
					window.open(`https://www.tmapmobility.com/`, '_blank');
				}
			}, 1500);

			// 앱 스킴 시도
			window.location.href = tmapAppUrl;
			
			// 페이지가 숨겨지면 (앱이 열렸다면) 타이머 취소
			document.addEventListener('visibilitychange', () => {
				if (document.hidden) {
					clearTimeout(timeout);
				}
			});
		} else {
			// 데스크톱에서는 티맵 웹사이트로 이동
			window.open(`https://www.tmapmobility.com/`, '_blank');
		}
	}

	onMount(() => {
		// Kakao JavaScript SDK 로드 (네비게이션용)
		const kakaoSDKScript = document.createElement('script');
		kakaoSDKScript.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js';
		kakaoSDKScript.integrity = 'sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p';
		kakaoSDKScript.crossOrigin = 'anonymous';
		kakaoSDKScript.onload = () => {
			// @ts-ignore
			if (window.Kakao && !window.Kakao.isInitialized()) {
				// @ts-ignore
				window.Kakao.init('5fb1510d2c5d6e295def723502664492'); // JavaScript 키로 초기화
			}
		};
		document.head.appendChild(kakaoSDKScript);

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
					draggable: true,
					zoomable: true,
				};
				// @ts-ignore
				const map = new window.kakao.maps.Map(mapContainer, options);
				
				// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
				// const mapTypeControl = new window.kakao.maps.MapTypeControl();

				// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
				// map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

				// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
				// @ts-ignore
				const zoomControl = new window.kakao.maps.ZoomControl();
				// @ts-ignore
				map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);


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
					window.open('https://kko.to/HABe17A8YV');
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
	
	<!-- 네비게이션 앱 링크들 -->
	<div class="navigation-links">
		<ul>
			<li>
				<button type="button" class="nav-link" onclick={startNavigation}>
					<img style="width: 2.2em;" src="https://static.barunsoncard.com/barunsonmcard/invitation/icon/kakaonav.png" draggable="false" alt="카카오내비 아이콘">
					카카오네비
				</button>
			</li>
			<li>
				<button type="button" class="nav-link" onclick={startTmapNavigation}>
					<img style="width: 2.0em;" src="https://static.barunsoncard.com/barunsonmcard/invitation/icon/tmap.png" draggable="false" alt="티맵 아이콘">
					티맵
				</button>
			</li>
			<li>
				<a href="https://kko.to/HABe17A8YV" class="nav-link" target="_blank">
					<img style="width: 2.4em;" src={kakaomapIcon} draggable="false" alt="카카오맵 아이콘"> 
					카카오맵
				</a>
			</li>
			<li>
				<a href="https://naver.me/I5yLhgW1" class="nav-link" target="_blank">
					<img style="width: 2.4em;" src="https://static.barunsoncard.com/barunsonmcard/invitation/icon/navermap.jpg" draggable="false" alt="네이버 지도 아이콘"> 
					네이버맵
				</a>
			</li>
		</ul>
		
	</div>
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
	.navigation-links {
		position: relative;
		text-align: center;
		width: 110%;
	}
	.navigation-links ul {
		display: inline-block;
		padding: 0;
		list-style-type: none;
	}
	.navigation-links ul li {
		float: left;
		margin-top: 1em;
		margin-right: 0.4em;
		height: 2.5em;
	}

	.navigation-links ul li img {
		width: 2.3em;
		vertical-align: middle;
		padding-right: 0.5em;
	}
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
		border-radius: 8px;
		overflow: hidden;
	}

	.navigation-links {
		display: flex;
		gap: 1rem;
		margin: 0rem 0;
		justify-content: center;
		flex-wrap: wrap;
	}

	.nav-link {
		height: inherit;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0rem 0.3rem;
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(224, 224, 224, 0.1);
		border-radius: 6px;
		text-decoration: none;
		color: $font-color-default;
		font-weight: 500;
		transition: all 0.2s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		font-family: inherit;
		font-size: 0.8rem;

		&:hover {
			background-color: #f5f5f5;
			border-color: $primary-color;
			color: $primary-color;
			transform: translateY(-1px);
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
		}

		&:active {
			transform: translateY(0);
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}
	}

	p.signature {
		font-size: 1rem;
	}
	.github-icon {
		margin-top: 0.2em;
		color: $font-color-default;
		cursor: pointer;
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
