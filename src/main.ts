import { app, BrowserWindow, ipcMain } from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
// "electron-squirrel-startup" seems broken when packaging with vite
//import started from "electron-squirrel-startup";
import path from "path";
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import Store from "electron-store";

const inDevelopment = process.env.NODE_ENV === "development";
const preload = path.join(__dirname, "preload.js");

let mainWindow: BrowserWindow;
let settingsWindow: BrowserWindow | null = null;

// Initialize store
const store = new Store({
  defaults: {
    language: "python",
  },
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    transparent: true,
    frame: true,
    alwaysOnTop: true,
    resizable: true,
    backgroundColor: "#00000000",
    hasShadow: false,
    webPreferences: {
      devTools: true,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      preload: preload,
      acceptFirstMouse: true,
    },
    titleBarStyle: "default",
  });

  // Make window click-through except for non-transparent regions
  mainWindow.setIgnoreMouseEvents(true, { forward: true });

  // mainWindow.webContents.openDevTools();
  // Prevents window from appearing in screen sharing
  mainWindow.setContentProtection(true);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Prevents window from appearing in screen sharing
  mainWindow.setContentProtection(true);
  registerListeners(mainWindow);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
}

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 400,
    height: 1200,
    parent: mainWindow,
    modal: true,
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: preload,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/settings`);
  } else {
    settingsWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      { hash: "settings" },
    );
  }

  settingsWindow.once("ready-to-show", () => {
    if (settingsWindow) settingsWindow.show();
  });

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}

async function installExtensions() {
  try {
    const result = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Extensions installed successfully: ${result.name}`);
  } catch {
    console.error("Failed to install extensions");
  }
}

app.whenReady().then(createWindow).then(installExtensions);

//osX only
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//osX only ends

// Add IPC handlers
ipcMain.on("open-settings", () => {
  createSettingsWindow();
});

ipcMain.on("close-settings", () => {
  if (settingsWindow) {
    settingsWindow.close();
  }
});

ipcMain.on("close-window", () => {
  mainWindow.close();
});

ipcMain.on("minimize-window", () => {
  mainWindow.minimize();
});

ipcMain.on("maximize-window", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("set-ignore-mouse-events", (_event, ignore, options) => {
  mainWindow.setIgnoreMouseEvents(ignore, options);
});

// Add this to your existing IPC handlers
ipcMain.handle("get-stored-language", () => {
  return store.get("language");
});

ipcMain.on("set-language", (_event, language: string) => {
  store.set("language", language);
});
