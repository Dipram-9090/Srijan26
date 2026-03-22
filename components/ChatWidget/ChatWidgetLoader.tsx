"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

export default function ChatWidgetLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setMounted(true), { timeout: 4000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setMounted(true), 3000);
      return () => clearTimeout(id);
    }
  }, []);

  if (!mounted) return null;
  return <ChatWidget />;
}