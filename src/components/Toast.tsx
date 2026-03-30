"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg shadow-lg transition-all duration-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {message}
    </div>
  );
}
