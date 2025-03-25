interface Window {
  electron: {
    // ... existing methods
    checkPermissions: () => Promise<{
      screen: boolean;
      hasRequested: boolean;
    }>;
    requestPermissions: () => Promise<boolean>;
  };
}
