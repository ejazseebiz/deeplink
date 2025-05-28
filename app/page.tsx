"use client";

import { useEffect } from "react";

// iOS detection (optional, kept for reference)
const isiOS = () => {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor;
  return (
    /iPhone|iPad|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export default function Home() {
  function shareThis(title: string, message: string, url: string) {
    const data = {
      type: 'share',
      payload: { title, message, url }
    };

    if (window.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    } else if (navigator.share) {
      navigator.share({ title, text: message, url });
    } else {
      prompt('Copy to clipboard:', url);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={() =>
          shareThis(
            "Check this out!",
            "This is a great website.",
            "https://example.com"
          )
        }
        style={buttonStyle}
      >
        Share
      </button>
    </div>
  );
}

const buttonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
  fontSize: "18px",
};
