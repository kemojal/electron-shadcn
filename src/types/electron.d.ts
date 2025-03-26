export interface IElectronAPI {
  // ... existing types ...
  takeScreenshot: () => Promise<string>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
} 