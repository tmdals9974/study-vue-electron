'use strict';

import { app, protocol, BrowserWindow, Menu, Tray } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
]);

let win;
async function createWindow() {
	win = new BrowserWindow({
		width: 1500,
		height: 800,
		minWidth: 1500,
		minHeight: 800,
		frame: false,
		show: false,
		// icon: path.join(__static, 'favicon.ico'),
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			enableRemoteModule: true
		}
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		if (!process.env.IS_TEST) win.webContents.openDevTools();
	} else {
		createProtocol('app');
		win.loadURL('app://./index.html');
	}

	tray.on('click', () => {
		win.isVisible() ? win.hide() : win.show();
	});

	win.once('ready-to-show', () => {
		win.show();
	});
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

let tray = null;
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		try {
			await installExtension(VUEJS_DEVTOOLS);
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString());
		}
	}

	tray = new Tray(path.join(__static, 'favicon.ico'));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'On/Off Toggle',
			click: () => {
				win.isVisible() ? win.hide() : win.show();
			}
		},
		{
			label: 'Close',
			click: () => {
				if (win.webContents.isDevToolsOpened()) {
					win.webContents.closeDevTools();
				}
				win.close();
			}
		}
	]);
	tray.setToolTip('electron sample tooltip');
	tray.setContextMenu(contextMenu);

	createWindow();
});

if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
