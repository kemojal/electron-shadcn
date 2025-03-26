import React from 'react';

interface ScreenshotViewerProps {
  screenshotUrl: string | null;
  onClose: () => void;
}

export function ScreenshotViewer({ screenshotUrl, onClose }: ScreenshotViewerProps) {
  if (!screenshotUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-4 shadow-2xl dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="relative">
          <img 
            src={screenshotUrl} 
            alt="Screenshot" 
            className="max-h-[85vh] max-w-[85vw] rounded-md shadow-lg" 
          />
        </div>
      </div>
    </div>
  );
} 