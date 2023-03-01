const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = () => ({
	env: {
		REACT_APP_FIREBASE_KEY: "AIzaSyCaFY6yIwPaA4Ei-JwKg8M38x9IpmD32-I",
		REACT_APP_FIREBASE_DOMAIN: "blogstack-bb2f3.firebaseapp.com",
		REACT_APP_FIREBASE_PROJECT_ID: "blogstack-bb2f3",
		REACT_APP_FIREBASE_STORAGE_BUCKET: "blogstack-bb2f3.appspot.com",
		REACT_APP_ID: "1:601190330940:web:966a879318f758ac188939",
		REACT_APP_MEASUREMENT_ID: "G-6ZJX206V4Y",
	},
	experimental: {
		esmExternals: false,
	},
	images: {
		domains: ["firebasestorage.googleapis.com", "public-files.gumroad.com"],
	},
	webpack: (config, options) => {
		config.node = {
			fs: "empty",
			child_process: "empty",
			net: "empty",
			dns: "empty",
			tls: "empty",
		};
		return config;
	},
	...withBundleAnalyzer({}),
});
