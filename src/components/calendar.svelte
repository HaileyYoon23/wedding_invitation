<script lang="ts">
	import sundayCol from '$lib/assets/calendar/calendar-sunday.svg';
	import mondayCol from '$lib/assets/calendar/calendar-monday.svg';
	import tuesdayCol from '$lib/assets/calendar/calendar-tuesday.svg';
	import wednesdayCol from '$lib/assets/calendar/calendar-wednesday.svg';
	import thursdayCol from '$lib/assets/calendar/calendar-thursday.svg';
	import fridayCol from '$lib/assets/calendar/calendar-friday.svg';
	import saturdayCol from '$lib/assets/calendar/calendar-saturday.svg';
	import calendarDeco from '$lib/assets/calendar-deco.png';

	function addToGoogleCalendar() {
		// 2026년 1월 31일 오후 3시 20분 (한국시간)
		const startDate = new Date(2026, 0, 31, 15, 20); // 월은 0부터 시작
		const endDate = new Date(2026, 0, 31, 16, 20); // 1시간 후 종료
		
		const formatDate = (date: Date) => {
			return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
		};

		const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
		googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
		googleCalendarUrl.searchParams.set('text', '윤서 ♡ 동현 결혼식');
		googleCalendarUrl.searchParams.set('dates', `${formatDate(startDate)}/${formatDate(endDate)}`);
		googleCalendarUrl.searchParams.set('details', '윤서와 동현의 결혼식에 참석해주세요.');
		googleCalendarUrl.searchParams.set('location', '더컨벤션 잠실, 3F 아모르홀, 서울 송파구 올림픽로 319 3층');
		googleCalendarUrl.searchParams.set('sf', 'true');
		googleCalendarUrl.searchParams.set('output', 'xml');

		window.open(googleCalendarUrl.toString(), '_blank');
	}
</script>

<section class="calendar">
	<h2 class="title en">January</h2>
	<div class="calendar-content">
		<img class="week-col" src={sundayCol} alt="sunday column" />
		<img class="week-col" src={mondayCol} alt="monday column" />
		<img class="week-col" src={tuesdayCol} alt="tuesday column" />
		<img class="week-col" src={wednesdayCol} alt="wednesday column" />
		<img class="week-col" src={thursdayCol} alt="thursday column" />
		<img class="week-col" src={fridayCol} alt="friday column" />
		<img class="week-col" src={saturdayCol} alt="saturday column" />
	</div>
	<img class="calendar-deco" src={calendarDeco} alt="calendar deco" onclick={addToGoogleCalendar} />
</section>

<style lang="scss">
	.calendar {
		position: relative;
		background-color: $white;
		padding: 2em 3.5em 4em 3.5em;

		.title {
			@extend .title-font-en;
			text-align: center;
			margin-bottom: 1em;
		}

		.calendar-content {
			display: flex;
			justify-content: space-between;

			.week-col {
				height: 100%;
			}
		}

		img.calendar-deco {
			position: absolute;
			bottom: 19.5em;
			right: 4.5em;
			width: 15%;
			cursor: pointer;
			transition: transform 0.2s ease;

			&:hover {
				transform: scale(1.15);
			}

			&:active {
				transform: scale(0.95);
			}
		}
	}
</style>
