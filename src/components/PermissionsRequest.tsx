import React, { useEffect, useState } from "react";

interface Permissions {
  screen: boolean;
  hasRequested: boolean;
}

export function PermissionsRequest() {
  const [permissions, setPermissions] = useState<Permissions | null>(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const perms = await window.electron.checkPermissions();
      setPermissions(perms);
    } catch (error) {
      console.error("Failed to check permissions:", error);
    }
  };

  const handleRequestPermissions = async () => {
    try {
      await window.electron.requestPermissions();
      await checkPermissions();
    } catch (error) {
      console.error("Failed to request permissions:", error);
    }
  };

  if (!permissions || permissions.screen || permissions.hasRequested) return null;

  const missingPermissions = Object.entries(permissions)
    .filter(([_, granted]) => !granted)
    .map(([name]) => name);

  if (missingPermissions.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">
            Screen Recording Permission Required
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Please grant screen recording access to enable screenshot
            functionality
          </p>
        </div>
        <button
          onClick={handleRequestPermissions}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Grant Access
        </button>
      </div>
    </div>
  );
}
