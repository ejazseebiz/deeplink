"use client"

import { useEffect, useState } from "react";

const APP_SCHEME = "saveseecard://"; // Your app's custom scheme
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.seecard";
const APP_STORE_URL = "https://apps.apple.com/np/app/seecard/id6502513661";

// const isAndroid = () => {
//   if (typeof navigator === "undefined") return false;
//   return /Android/i.test(navigator.userAgent);
// };

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
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  useEffect(() => {

    if (typeof window === "undefined") return; // Ensure code runs only on the client

    const checkAppInstalled = () => {
      const now = new Date().getTime();
      window.location.href = APP_SCHEME;
      
      setTimeout(() => {
        const elapsedTime = new Date().getTime() - now;
        if (elapsedTime < 1500) {
          setIsAppInstalled(false);
        } else {
          setIsAppInstalled(true);
        }
      }, 1000);
    };

    checkAppInstalled();
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

        <p>{isAppInstalled == true ? "App is installed" : "App not installed"}</p>
        <p>{isiOS() ? 'APP_STORE_URL' : 'PLAY_STORE_URL'}</p>
        <p>{isAppInstalled}</p>

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