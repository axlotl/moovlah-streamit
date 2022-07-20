const webpack = require("webpack");
module.exports = {
	publicPath:
		process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASE_URL : "/",
	lintOnSave: false,
	devServer: {
		host: "127.0.0.1",
		port: 8081,
	},
	configureWebpack: {
		plugins: [
			new webpack.IgnorePlugin({
				resourceRegExp: /^\.\/locale$/,
				contextRegExp: /moment$/,
			}),
		],
		resolve: {
			alias: {
				vue$: "vue/dist/vue.common.js",
			},
		},
		watchOptions: {
			ignored: "node_modules",
		},
	},

	pluginOptions: {
		i18n: {
			locale: "en",
			fallbackLocale: "en",
			localeDir: "locales",
			enableInSFC: false,
		},
	},
};
