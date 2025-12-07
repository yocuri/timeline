export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Ece4P_Ab.js",app:"_app/immutable/entry/app.C7YmbCrr.js",imports:["_app/immutable/entry/start.Ece4P_Ab.js","_app/immutable/chunks/C4C2cO65.js","_app/immutable/chunks/DOMSFqr5.js","_app/immutable/chunks/ByAN4lTx.js","_app/immutable/entry/app.C7YmbCrr.js","_app/immutable/chunks/DOMSFqr5.js","_app/immutable/chunks/BvuHq7ji.js","_app/immutable/chunks/Xm-dkYwe.js","_app/immutable/chunks/ByAN4lTx.js","_app/immutable/chunks/C9ZZjqoP.js","_app/immutable/chunks/X9EA-Kyk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
