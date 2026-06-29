import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 min-w-[320px]">
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <span className="text-green-500 text-lg">✓</span>
      </div>
      <span className="text-sm font-medium text-gray-700">{message}</span>
    </div>
  );
}
