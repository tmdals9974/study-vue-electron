const path = require('path');

module.exports = {
	pluginOptions: {
		electronBuilder: {
			externals: ['nedb-promises'],
			nodeIntegration: true,
			builderOptions: {
				extraResources: ['src/database/data.db'],
				appId: 'com.sample.electron-vue',
				nsis: {
					oneClick: false,
					perMachine: true,
					allowToChangeInstallationDirectory: true,
					installerIcon: './src/assets/favicon.ico',
					uninstallerIcon: './src/assets/favicon.ico'
					// shortcutName: ''
				},
				win: {
					requestedExecutionLevel: 'highestAvailable',
					icon: './build/icon.png' //윈도우 : 256x256 이상 , 맥 : 512 x 512 이상
				}
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				src: path.resolve(__dirname, 'src')
			}
		}
	}
};
