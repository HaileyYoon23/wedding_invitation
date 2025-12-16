<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import ContactAccordion from './contact-accordion.svelte';

</script>

<section class="account">
	<div class="accordion-container">
		<ContactAccordion />
	</div>
</section>

<style lang="scss">
	section.account {
		padding: 4.5em 3.5em;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img.header-deco {
		width: 8em;
		margin-bottom: 0.8em;
	}

	h2.title {
		color: $primary-color;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		&.kr {
			margin-top: 0.9em;
		}
	}

	form.contact-form {
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

	input.message {
		padding: 0.4em 0.8em;
		margin-top: 1em;
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
