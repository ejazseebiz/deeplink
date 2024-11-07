"use client"
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {

  const [isInstalled, setIsInstalled] = useState(true);

  // Helper function for device detection
  const isiOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = () => /Android/i.test(navigator.userAgent);

   // Function to open app or fallback to store
   const redirectToApp = () => {
    let fallbackLink = "https://deeplink-kappa.vercel.app"; 

    if (isiOS() || isAndroid()) {
      alert("Mobile");
      window.location.href = "mychat://open";
      const androidAppStoreLink = "https://play.google.com/store/apps/details?id=com.test.android";
      const iosAppStoreLink = "itms-apps://itunes.apple.com/app/my-app/idxxxxxxxx?mt=8";
      fallbackLink = isAndroid() ? androidAppStoreLink : iosAppStoreLink;

      setTimeout(() => {
        if (document.hasFocus()) {
          window.location.href = fallbackLink; 
          setIsInstalled(false);
        }
      }, 1000);
    } else {
      // alert("PC");
      // window.location.href = fallbackLink;
    }
  };

  useEffect(() => {
    redirectToApp(); 
  }, []);


//   useEffect(() => {
//     const checkAppInstalled = () => {
//         const appUrl = 'mychat://open';
        
//         // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.whatsapp';

//         // Try to open the app
//         window.location.href = appUrl;

//         // If the app doesn’t open, display the download option
//         const timeout = setTimeout(() => {
//             setIsInstalled(false);
//         }, 1000);

//         // If the app is installed, handle the "blur" event
//         window.addEventListener('blur', () => {

//             clearTimeout(timeout);
//             setIsInstalled(true);
//             alert("Blur")
//         });

//         // Cleanup event listener on unmount
//         return () => window.removeEventListener('blur', () => setIsInstalled(true));
//     };

//     checkAppInstalled();
// }, []);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

      <h1>{isInstalled === false ? "Looks like you don't have WhatsApp installed!" : "Checking WhatsApp installation..."}</h1>
            {isInstalled === null ? null : (
                <button
                    onClick={() => window.location.href = isInstalled ? 'mychat://open' : 'https://play.google.com/store/apps/details?id=com.seecard'}
                    
                >
                    {isInstalled ? "Open App" : "Download"}
                </button>
            )}
            {isInstalled === false && (
                <p>
                    or{' '}
                    <Link href="https://web.whatsapp.com">
                        use WhatsApp Web
                    </Link>
                </p>
            )}

<hr />
<hr />
<hr />

        <h1>Open Universal Link</h1>
        <a href="https://deeplink-kappa.vercel.app/">Open Link</a>
        <hr  />

        <h1>Open MyChat App</h1>
        <a href="mychat://open">Open App</a>
        <hr  />

        <h1>MyChat Open App </h1>
        <a href="mychat://open#Intent;scheme=mychat;package=com.seecard;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.seecard;end;">
          Open App2
        </a>
        <p>If the app is not installed, nothing will happen.</p>

      </main>
    </div>
  );
}
