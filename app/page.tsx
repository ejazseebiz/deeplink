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

    let hidden = false;
    const now = new Date().getTime();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // User returned to the browser
        const elapsedTime = new Date().getTime() - now;
        setIsAppInstalled(elapsedTime >= 1500);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (isiOS()) {
      // On iOS, use an iframe to prevent Safari error
      const hiddenIframe = document.createElement("iframe");
      hiddenIframe.style.display = "none";
      hiddenIframe.src = APP_SCHEME;
      document.body.appendChild(hiddenIframe);

      setTimeout(() => {
        if (!hidden) setIsAppInstalled(false);
        document.body.removeChild(hiddenIframe);
      }, 2000);
    } else {
      // On Android, try opening the app
      window.location.href = APP_SCHEME;

      setTimeout(() => {
        if (!hidden) setIsAppInstalled(false);
      }, 2000);
    }
  }, []);

  if (isAppInstalled === null) {
    return <p>Checking app installation...</p>;
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
