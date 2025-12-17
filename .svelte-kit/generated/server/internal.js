
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/.pnpm/@sveltejs+kit@2.20.3_@sveltejs+vite-plugin-svelte@4.0.4_svelte@5.25.6_vite@5.4.17_@type_a089f28b01306a4ab6770559d5ae4728/node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"ko\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n\t\t" + head + "\n\t\t<meta property=\"og:title\" content=\"동현♥️윤서의 결혼식에 초대합니다\" />\n\t\t<meta property=\"og:description\" content=\"26년 1월 31일 오후 3시 20분, 더컨벤션 잠실, 3F 아모르홀\" />\n\t\t<meta property=\"og:image\" content=\"https://raw.githubusercontent.com/HaileyYoon23/wedding_invitation/refs/heads/main/src/lib/assets/cover.webp\" />\n\t\t<meta property=\"og:url\" content=\"https://kko.to/marry-ryuna/\" />\n\t\t<meta property=\"og:type\" content=\"website\" />\n\t\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css\"/>\n\t\t\n\t\t<!-- 모바일 메모리 최적화 -->\n\t\t<meta name=\"format-detection\" content=\"telephone=no\">\n\t\t<meta name=\"mobile-web-app-capable\" content=\"yes\">\n\t\t<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n\t\t<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"default\">\n\t\t\n\t\t<!-- 서비스 워커 등록 -->\n\t\t<script>\n\t\t\tif ('serviceWorker' in navigator) {\n\t\t\t\twindow.addEventListener('load', () => {\n\t\t\t\t\tnavigator.serviceWorker.register('/sw.js')\n\t\t\t\t\t\t.then((registration) => {\n\t\t\t\t\t\t\tconsole.log('SW registered: ', registration);\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch((registrationError) => {\n\t\t\t\t\t\t\tconsole.log('SW registration failed: ', registrationError);\n\t\t\t\t\t\t});\n\t\t\t\t});\n\t\t\t}\n\t\t\t\n\t\t\t// 메모리 압박 감지 및 대응\n\t\t\tif ('memory' in performance) {\n\t\t\t\tconst checkMemory = () => {\n\t\t\t\t\tconst memory = performance.memory;\n\t\t\t\t\tconst usedMB = memory.usedJSHeapSize / 1024 / 1024;\n\t\t\t\t\tconst totalMB = memory.totalJSHeapSize / 1024 / 1024;\n\t\t\t\t\t\n\t\t\t\t\t// 메모리 사용량이 80% 초과 시 캐시 정리\n\t\t\t\t\tif (usedMB / totalMB > 0.8) {\n\t\t\t\t\t\tif ('serviceWorker' in navigator && navigator.serviceWorker.controller) {\n\t\t\t\t\t\t\tnavigator.serviceWorker.controller.postMessage({\n\t\t\t\t\t\t\t\ttype: 'CLEAR_CACHE'\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\t\n\t\t\t\t// 주기적 메모리 체크 (모바일에서만)\n\t\t\t\tif (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {\n\t\t\t\t\tsetInterval(checkMemory, 30000); // 30초마다 체크\n\t\t\t\t}\n\t\t\t}\n\t\t</script>\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "1w1l0wh"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };
