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
      className={`fixed bottom-4 left-4 right-4 z-50 rounded-[1.4rem] border border-accent/18 bg-card/94 px-4 py-3 text-sm font-medium text-ink shadow-[0_28px_60px_-36px_rgba(36,25,21,0.9)] transition-all duration-200 sm:left-auto sm:right-6 sm:max-w-sm ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span>{message}</span>
      </div>
    </div>
  );
}
