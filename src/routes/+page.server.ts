import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

async function sendDiscordMessage(text: string) {
	const now = new Date();
	const timestamp = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
	const message = {
		content: `[${timestamp}] ${text}`
	};
	
	const response = await fetch(env.DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message)
	});
	
	return response.ok;
}

export const actions = {
	rsvp: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('fullname')?.toString().trim();
		const rsvp = formData.get('rsvp')?.toString();

		if (!name) {
			return fail(400, { missingName: true });
		}

		if (!rsvp) {
			return fail(400, { missingRsvp: true });
		}

		const rsvpText = rsvp === 'yes' ? '참석' : '불참';
		const message = `🎉 결혼식 참석여부 회신\n👤 이름: ${name}\n✅ 참석여부: ${rsvpText}`;
		
		const success = await sendDiscordMessage(message);
		
		if (!success) {
			return fail(400, { name, emailError: true });
		}

		return { success: true };
	}
} satisfies Actions;
