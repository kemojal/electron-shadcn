import React, { useEffect, useState } from "react";
import { IconCamera, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface Permissions {
  screen: boolean;
  hasRequested: boolean;
}

export function PermissionsRequest() {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  const [isVisible, setIsVisible] = useState(true);

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

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!permissions || permissions.screen || permissions.hasRequested || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-0 bottom-6 z-50 mx-auto max-w-xl px-4"
      >
        <div className="relative overflow-hidden rounded-xl bg-white/90 p-6 shadow-2xl backdrop-blur-lg dark:bg-gray-800/90">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
          >
            <IconX className="h-4 w-4" />
          </button>

          <div className="flex items-start space-x-4">
            {/* Icon */}
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <IconCamera className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
                Screen Recording Access Required
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                To enable screenshot functionality, we need permission to record your screen. 
                Your privacy is important to us - screenshots are only captured when you explicitly request them.
              </p>

              {/* Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRequestPermissions}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-500"
                >
                  Open System Settings
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
