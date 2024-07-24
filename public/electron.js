const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
let isDev;
import('electron-is-dev').then((module) => {
  isDev = module.default;
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    title: "JUKEBOX",
    autoHideMenuBar: true,
    // titleBarStyle: "hiddenInset",
    // resizable: false,
    // kiosk: true
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));
  //mainWindow.webContents.openDevTools()
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

