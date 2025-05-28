"use client";

import { useEffect, useState } from "react";

const APP_SCHEME = "saveseecard://"; // Your app's custom scheme
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.seecard";
const APP_STORE_URL = "https://apps.apple.com/np/app/seecard/id6502513661";

// Function to check if the user is on iOS
const isiOS = () => {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor;
  return (
    /iPhone|iPad|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};

export default function Home() {
  const [isAppInstalled, setIsAppInstalled] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure code runs only on client

    let hasNavigatedAway = false;
    let timeout: NodeJS.Timeout;

    const handleBlur = () => {
      hasNavigatedAway = true; // User left the page
    };

    const handleFocus = () => {
      if (hasNavigatedAway) {
        setIsAppInstalled(true); // User returned → app likely opened
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    if (isiOS()) {
      // On iOS, use an iframe to avoid Safari errors
      const hiddenIframe = document.createElement("iframe");
      hiddenIframe.style.display = "none";
      hiddenIframe.src = APP_SCHEME;
      document.body.appendChild(hiddenIframe);

      timeout = setTimeout(() => {
        document.body.removeChild(hiddenIframe);
        setIsAppInstalled(hasNavigatedAway);
      }, 2000);
    } else {
      // On Android, try opening the app
      window.location.href = APP_SCHEME;

      timeout = setTimeout(() => {
        setIsAppInstalled(hasNavigatedAway);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  if (isAppInstalled === null) {
    return <p>Checking app installation...</p>;
  }


 function shareThis() {
    const data = {
      type: 'share',
      payload: {
        title: 'Check this out!',
        message: 'This is a great website.',
        url: 'https://example.com'
      }
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isAppInstalled ? (
        <a href={APP_SCHEME} style={buttonStyle}>
          Open App
        </a>
      ) : (
        <a href={isiOS() ? APP_STORE_URL : PLAY_STORE_URL} style={buttonStyle}>
          Install App
        </a>
      )}

      <p>{isAppInstalled ? "App is installed" : "App not installed"}</p>
      <p>{isiOS() ? "APP_STORE_URL" : "PLAY_STORE_URL"}</p>
      <p>{isAppInstalled.toString()}</p>
      <p>
      <button onClick={shareThis}>Share</button>
      </p>
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
