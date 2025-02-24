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

declare global {
  interface Navigator {
    getInstalledRelatedApps?: () => Promise<{ id: string; platform: string; url: string }[]>;
  }
}

export default function Home() {
  const [isAppInstalled, setIsAppInstalled] = useState<boolean | null>(null);
  // const [checkApps, setCheckdApps] = useState(null);

  const [isInstalled, setIsInstalled] = useState<boolean | null>(null);


  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure code runs only on client

    
    const checkInstalledApps = async () => {
      if (navigator.getInstalledRelatedApps) {
        try {
          const installedApps = await navigator.getInstalledRelatedApps();
          console.log("Installed Apps:", installedApps);

          setIsInstalled(installedApps.length > 0);
        } catch (error) {
          console.error("Error checking installed apps:", error);
          setIsInstalled(null);
        }
      } else {
        console.log("API not supported in this browser.");
        setIsInstalled(null);
      }
    };

    checkInstalledApps();


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

{isInstalled === true ? (
        <p>✅ App is installed!</p>
      ) : isInstalled === false ? (
        <p>❌ App is NOT installed.</p>
      ) : (
        <p>⚠️ API not supported.</p>
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
