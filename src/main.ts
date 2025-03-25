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

const startTime = Date.now();

const inDevelopment = process.env.NODE_ENV === "development";
const preload = path.join(__dirname, "preload.js");

let mainWindow: BrowserWindow;
let settingsWindow: BrowserWindow | null = null;

// Move store initialization outside of any function
const store = new Store({
  defaults: {
    language: "python",
  },
  // Add this to improve performance
  clearInvalidConfig: true,
});

// Separate extension installation from main window creation
async function installDevTools() {
  if (!inDevelopment) return;

  try {
    const result = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Extensions installed successfully: ${result.name}`);
  } catch (err) {
    console.error("Failed to install extensions:", err);
  }
}

function createWindow() {
  try {
    // Modify loading window settings
    const loadingWindow = new BrowserWindow({
      width: 200,
      height: 200,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      webPreferences: {
        contextIsolation: true,
      },
      show: false,
      // Add these to make loading window click-through
      focusable: false,
      hasShadow: false,
    });

    // Make loading window click-through
    loadingWindow.setIgnoreMouseEvents(true, { forward: true });

    mainWindow = new BrowserWindow({
      width: 800,
      height: 900,
      transparent: true,
      frame: true,
      alwaysOnTop: true,
      resizable: true,
      backgroundColor: "#00000000",
      hasShadow: false,
      focusable: false,
      skipTaskbar: true,
      webPreferences: {
        devTools: inDevelopment,
        contextIsolation: true,
        nodeIntegration: true,
        nodeIntegrationInSubFrames: false,
        preload: preload,
        backgroundThrottling: false,
        webSecurity: !inDevelopment,
      },
      show: false,
    });

    // Show loading window immediately
    loadingWindow.loadFile(path.join(__dirname, "loading.html"));
    loadingWindow.once("ready-to-show", () => {
      loadingWindow.show();
    });

    // Make main window click-through
    mainWindow.setIgnoreMouseEvents(true, { forward: true });
    mainWindow.setContentProtection(true);

    // Ensure click-through is maintained after window is shown
    mainWindow.once("ready-to-show", () => {
      console.log(`Time to ready-to-show: ${Date.now() - startTime}ms`);
      mainWindow.show();
      // Re-apply click-through after showing
      mainWindow.setIgnoreMouseEvents(true, { forward: true });
      loadingWindow.close();
    });

    // Add handler to ensure click-through is maintained
    mainWindow.on("focus", () => {
      mainWindow.setIgnoreMouseEvents(true, { forward: true });
    });

    // Optimize window loading
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL, {
        httpReferrer: {
          url: MAIN_WINDOW_VITE_DEV_SERVER_URL,
          policy: "no-referrer",
        },
      });
    } else {
      mainWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
        { httpReferrer: { url: "about:blank", policy: "no-referrer" } },
      );
    }

    // Register listeners after window creation
    registerListeners(mainWindow);

    console.log(`Time to window creation: ${Date.now() - startTime}ms`);
  } catch (err) {
    console.error("Failed to create window:", err);
    app.quit();
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
    console.log(`Time to ready-to-show: ${Date.now() - startTime}ms`);
    if (settingsWindow) settingsWindow.show();
  });

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}

// Modify the app startup sequence
app.whenReady().then(async () => {
  createWindow();

  // Install DevTools in the background without blocking window creation
  if (inDevelopment) {
    installDevTools().catch(console.error);
  }

  console.log(`Time to store init: ${Date.now() - startTime}ms`);
  console.log(`Time to window load: ${Date.now() - startTime}ms`);
});

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
  // Re-enable click-through after a short delay if ignore is false
  if (!ignore) {
    setTimeout(() => {
      mainWindow.setIgnoreMouseEvents(true, { forward: true });
    }, 100);
  }
});

// Optimize IPC handlers by adding error handling
ipcMain.handle("get-stored-language", () => {
  try {
    return store.get("language");
  } catch (err) {
    console.error("Error getting language:", err);
    return "python"; // fallback
  }
});

ipcMain.on("set-language", (_event, language: string) => {
  try {
    store.set("language", language);
  } catch (err) {
    console.error("Error setting language:", err);
  }
});
