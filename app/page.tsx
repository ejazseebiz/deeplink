"use client"

import { useEffect, useState } from "react";

const APP_SCHEME = "seecard://"; // Your app's custom scheme
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.seecard.marketplace";
const APP_STORE_URL = "https://apps.apple.com/app/idYOUR_APP_ID";


export default function Home() {
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // const isAndroid = () => /Android/i.test(navigator.userAgent);
  // const isiOS = () => {
  //   const userAgent = navigator.userAgent || navigator.vendor;
  //   return (
  //     /iPhone|iPad|iPod/.test(userAgent) || 
  //     (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  //   );
  // };
  
  
  useEffect(() => {
    const checkAppInstalled = () => {
      const now = new Date().getTime();
      window.location = APP_SCHEME;
      
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



  return (
<div style={{ textAlign: "center", marginTop: "50px" }}>
      {isAppInstalled ? (
        <a href={APP_SCHEME} style={buttonStyle}>
          Open App
        </a>
      ) : (
        <a
          href={navigator.userAgent.includes("iPhone") ? APP_STORE_URL : PLAY_STORE_URL}
          style={buttonStyle}
        >
          Install App
        </a>
      )}
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