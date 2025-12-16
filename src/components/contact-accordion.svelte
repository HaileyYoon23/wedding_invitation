<script lang="ts">
	import { Accordion, type AccordionItem } from 'melt/builders';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { slide } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';
	import { type Snippet } from 'svelte';

	type Item = AccordionItem<{
		title: string;
	}>;


	const accounts: Item[] = [
		{ id: '1', title: $_('contact.accordion.groom.name') },
		{ id: '2', title: $_('contact.accordion.bride.name') }	
	];
	

	const accordion = new Accordion({
		multiple: true
	});

	const account_1 = accordion.getItem(accounts[0]);
	const account_2 = accordion.getItem(accounts[1]);

	// 토스트 메시지 상태
	let showToast = $state(false);
	let toastTimeout: ReturnType<typeof setTimeout>;

	// 텍스트에서 숫자만 추출하는 함수
	function extractNumbers(text: string): string {
		return text.replace(/\D/g, '');
	}

	// 토스트 메시지 표시 함수
	function showToastMessage() {
		// 기존 타이머가 있다면 클리어
		if (toastTimeout) {
			clearTimeout(toastTimeout);
		}
		
		showToast = true;
		
		// 2초 후에 토스트 숨기기
		toastTimeout = setTimeout(() => {
			showToast = false;
		}, 2000);
	}

	// 클립보드에 복사하는 함수
	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			showToastMessage();
		} catch (err) {
			console.error('복사 실패:', err);
			// 폴백: 구식 방법으로 복사 시도
			try {
				const textArea = document.createElement('textarea');
				textArea.value = text;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand('copy');
				document.body.removeChild(textArea);
				showToastMessage();
			} catch (fallbackErr) {
				console.error('폴백 복사도 실패:', fallbackErr);
			}
		}
	}

	// p 요소 클릭 핸들러
	function handlePClick(event: Event) {
		const target = event.target as HTMLElement;
		const text = target.textContent || '';
		const numbers = extractNumbers(text);
		if (numbers) {
			copyToClipboard(numbers);
		}
	}

</script>

{#snippet accordionItem(item: ReturnType<Accordion['getItem']>, content: Snippet)}
	<div class="item">
		<div {...item.heading} class="heading">
			<button {...item.trigger} class="trigger {localeStore.locale}">
				{item.item.title}
				<div class="chevron-down-container {localeStore.locale}" class:rotate={item.isExpanded}>
					<ChevronDown strokeWidth={1.25} />
				</div>
			</button>
			
		</div>

		{#if item.isExpanded}
			<div
				{...item.content}
				class="content {localeStore.locale}"
				transition:slide={{ duration: 150 }}
			>
				{@render content()}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet account_1_content()}
	<button 
		onclick={handlePClick}
		class="clickable account-button" 
		aria-label="계좌번호 복사하기"
	>
		{$_('contact.accordion.groom.self')}
	</button>
	<button 
		onclick={handlePClick}
		class="clickable account-button" 
		aria-label="계좌번호 복사하기"
	>
		{$_('contact.accordion.groom.father')}
	</button>
	<button 
		onclick={handlePClick}
		class="clickable account-button" 
		aria-label="계좌번호 복사하기"
	>
		{$_('contact.accordion.groom.mother')}
	</button>
{/snippet}

{#snippet account_2_content()}
	<button 
		onclick={handlePClick}
		class="clickable account-button" 
		aria-label="계좌번호 복사하기"
	>
		{$_('contact.accordion.bride.self')}
	</button>
	<button 
		onclick={handlePClick}
		class="clickable account-button" 
		aria-label="계좌번호 복사하기"
	>
		{$_('contact.accordion.bride.father')}
	</button>
	<button 
		onclick={handlePClick}
		class="clickable account-button" 
		aria-label="계좌번호 복사하기"
	>
		{$_('contact.accordion.bride.mother')}
	</button>
{/snippet}

<div class="accordion-root" {...accordion.root}>
	<div class="header">
		<h2 class="contact-title {localeStore.locale}">{$_('contact.title')}</h2>
		<p class="contact-sub-title {localeStore.locale}">
			{$_('contact.sub_title')}
		</p>
	</div>
	<div class="item"></div>
	{@render accordionItem(account_1, account_1_content)}
	{@render accordionItem(account_2, account_2_content)}
</div>

<!-- 토스트 메시지 -->
{#if showToast}
	<div class="toast" transition:slide={{ duration: 300 }}>
		복사했습니다
	</div>
{/if}

<style lang="scss">
	.contact-title {
		font-size: 1.1rem;
		text-align: center;
	}
	.contact-sub-title {
		font-size: 0.8rem;
		text-align: center;
	}
	.accordion-root {
		width: 70%;
	}

	.item {
		margin-bottom: 1em;
	}

	.heading {
		border-top: 1px solid $primary-color-light;
		position: relative;
	}

	button.trigger {
		color: $primary-color;
		width: 100%;

		&.en {
			letter-spacing: 1px;
			font-weight: 600;
			font-size: 1.3rem;
			padding: 0.6em 0;
		}

		&.kr {
			letter-spacing: 1px;
			font-weight: 500;
			font-size: 1.1rem;
			padding: 0.8em 0;
		}
	}

	.chevron-down-container {
		position: absolute;
		width: 1.5em;
		height: 1.5em;
		right: 0.6em;
		color: $primary-color;
		transition: transform 350ms ease;

		&.en {
			top: 1.05em;
		}

		&.kr {
			top: 0.9em;
		}

		&.rotate {
			transform: rotate(180deg);
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5em 0.5em 1em 0.5em;

		button.account-button {
			background: none;
			border: none;
			font-family: inherit;
			font-size: inherit;
			color: inherit;
			text-align: center;
			width: 100%;
			display: block;

			&.clickable {
				cursor: pointer;
				transition: all 0.2s ease;
				padding: 0.3em 0.5em;
				border-radius: 4px;

				&:hover {
					background-color: rgba(0, 0, 0, 0.05);
					transform: scale(1.02);
				}

				&:active {
					transform: scale(0.98);
					background-color: rgba(0, 0, 0, 0.1);
				}

				&:focus {
					outline: 2px solid rgba(0, 0, 0, 0.2);
					outline-offset: 2px;
				}
			}
		}

		&.kr button.account-button {
			font-size: 0.9rem;

			&:not(:last-child) {
				margin-bottom: 0.5em;
			}
		}
	}

	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 0.8rem 1.5rem;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 500;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		pointer-events: none;
	}
</style>
