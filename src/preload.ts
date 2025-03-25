import exposeContexts from "./helpers/ipc/context-exposer";
import { contextBridge, ipcRenderer } from "electron";

exposeContexts();

contextBridge.exposeInMainWorld("electron", {
  openSettings: () => ipcRenderer.send("open-settings"),
  closeSettings: () => ipcRenderer.send("close-settings"),
  closeWindow: () => ipcRenderer.send("close-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
  setIgnoreMouseEvents: (ignore: boolean, options?: { forward: boolean }) =>
    ipcRenderer.send("set-ignore-mouse-events", ignore, options),
  getStoredLanguage: () => ipcRenderer.invoke('get-stored-language'),
  setLanguage: (language: string) => ipcRenderer.send('set-language', language),
});
