import { ReactNode, useState, useRef } from "react";

export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = () => {
    // Prevent the touch from also firing a mouse event
    setVisible((v) => !v);
  };

  const handleMouseEnter = () => {
    // Only runs on real pointer devices
    setVisible(true);
  };

  const handleMouseLeave = () => {
    // Small delay so moving toward the tooltip doesn't flash it away
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  return (
    <div
      className="group relative flex max-w-max flex-col items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {children}
      <div
        className={`absolute top-2 left-0 sm:left-full mr-auto ml-auto min-w-max
          -translate-x-full -translate-y-1/2 sm:translate-x-0
          transform rounded-lg px-3 py-2 text-sm font-medium
          transition-all duration-500
          ${visible ? "scale-100" : "scale-0"}`}
      >
        <div className="flex max-w-xs flex-col items-center shadow-lg">
          <div className="rounded bg-gray-800 p-2 text-center text-white">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}