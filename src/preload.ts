import exposeContexts from "./helpers/ipc/context-exposer";
import { contextBridge, ipcRenderer } from "electron";

exposeContexts();

contextBridge.exposeInMainWorld("electron", {
  openSettings: () => ipcRenderer.send("open-settings"),
  closeSettings: () => ipcRenderer.send("close-settings"),
});
