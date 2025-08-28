<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import RsvpSelect from './rsvp-select.svelte';
	import rsvpDeco from '$lib/assets/rsvp-deco.svg';
	import RsvpAccordion from './rsvp-accordion.svelte';

	let rsvp = $state<'yes' | 'no' | null>(null);
	let submitting = $state(false);
	let formResult = $state<{ success?: boolean; emailError?: boolean; missingName?: boolean; missingRsvp?: boolean; name?: string } | null>(null);

	async function sendDiscordMessage(text: string) {
		const now = new Date();
		const timestamp = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
		const message = {
			content: `[${timestamp}] ${text}`
		};
		
		const response = await fetch('https://discordapp.com/api/webhooks/1410565116084097159/PgYypMOEyPul5b0kH8t3JFm-RuqJkLV8-qEYlLyWqMiIpnqaV9GH88F-tSmdVAbgzW7p', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message)
		});
		
		return response.ok;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		submitting = true;
		formResult = null;

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get('fullname')?.toString().trim();

		if (!name) {
			formResult = { missingName: true };
			submitting = false;
			return;
		}

		if (!rsvp) {
			formResult = { missingRsvp: true };
			submitting = false;
			return;
		}

		const rsvpText = rsvp === 'yes' ? '참석' : '불참';
		const message = `🎉 결혼식 참석여부 회신\n👤 이름: ${name}\n✅ 참석여부: ${rsvpText}`;
		
		const success = await sendDiscordMessage(message);
		
		if (!success) {
			formResult = { name, emailError: true };
		} else {
			formResult = { success: true };
			rsvp = null;
			form.reset();
		}

		submitting = false;
	}

	function clearValidationMessage(formInput: 'name' | 'rsvp') {
		if (formInput === 'name' && formResult?.missingName) {
			formResult = null;
		}

		if (formInput === 'rsvp' && formResult?.missingRsvp) {
			formResult = null;
		}
	}
</script>

<section class="rsvp">
	<div class="header">
		<img class="header-deco" src={rsvpDeco} alt="rsvp header deco" />
		<h2 class="title {localeStore.locale}">{$_('rsvp.title')}</h2>
		<p class="sub-title {localeStore.locale}">
			{$_('rsvp.reply_by')}
		</p>
	</div>

	<form
		class="rsvp-form"
		onsubmit={handleSubmit}
	>
		<input
			class="fullname {localeStore.locale}"
			name="fullname"
			value={formResult?.name ?? ''}
			placeholder={$_('rsvp.fullname_placeholder')}
			onfocus={() => clearValidationMessage('name')}
		/>
		<div class="select-container">
			<RsvpSelect bind:rsvp clearForm={() => clearValidationMessage('rsvp')} />
		</div>
		<button class="send {localeStore.locale}" type="submit" disabled={submitting}>
			{#if submitting}
				<div class="spinning">
					<LoaderCircle />
				</div>
			{:else}
				{$_('rsvp.send')}
			{/if}
		</button>
	</form>
	<div class="submit-message">
		{#if formResult?.success}
			<p class="success {localeStore.locale}">
				{$_('rsvp.email_success')}
			</p>
		{/if}
		{#if formResult?.emailError}
			<p class="error {localeStore.locale}">
				{$_('rsvp.email_error')}
			</p>
		{/if}
		{#if formResult?.missingName}
			<p class="error {localeStore.locale}">
				{$_('rsvp.missing_name_error')}
			</p>
		{/if}
		{#if formResult?.missingRsvp}
			<p class="error {localeStore.locale}">
				{$_('rsvp.missing_rsvp_error')}
			</p>
		{/if}
	</div>

	<div class="accordion-container">
		<RsvpAccordion />
	</div>
</section>

<style lang="scss">
	section.rsvp {
		padding: 4.5em 3.5em;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img.header-deco {
		width: 4.5em;
		margin-bottom: 0.8em;
	}

	h2.title {
		color: $primary-color;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}

		&.en {
			@extend .title-font-en;
			letter-spacing: 3px;
		}
	}

	p.sub-title {
		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}

		&.en {
			margin-top: 0.5em;
			font-size: 1.2rem;
		}
	}

	form.rsvp-form {
		margin-top: 3em;
	}

	input.fullname {
		padding: 0.4em 0.8em;
		width: 100%;
		border: 1px solid $white-2;
		border-radius: 4px;
		letter-spacing: 0.02em;

		&:active,
		&:focus {
			@extend .input-focused;
		}
		&::placeholder {
			color: $font-color-light;
		}
		&.kr::placeholder {
			font-size: 0.9rem;
		}
	}

	.select-container {
		margin-top: 1em;
	}

	button.send {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 3em;
		height: 2.5em;
		width: 100%;
		background-color: $primary-color;
		border-radius: 4px;
		color: $white;
		letter-spacing: 0.05em;

		&[disabled] {
			background-color: $primary-color-light;
			cursor: not-allowed;
		}

		&:active {
			background-color: $primary-color-dark;
		}

		&.kr {
			font-weight: 600;
		}

		&.en {
			font-weight: 700;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(359deg);
		}
	}

	.spinning {
		display: flex;
		justify-content: center;
		align-items: center;
		animation: spin 1s linear infinite;
	}

	.submit-message {
		margin-top: 0.5em;
		height: 1.5em;

		.kr {
			font-size: 0.9rem;
		}

		.en {
			font-size: 1.1rem;
		}

		p.success {
			color: $green-1;
		}

		p.error {
			color: $red-1;
		}
	}

	.accordion-container {
		margin-top: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
