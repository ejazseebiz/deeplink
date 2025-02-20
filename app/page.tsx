"use client"

export default function Home() {
  const isAndroid = () => /Android/i.test(navigator.userAgent);
  const isIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return (
      /iPhone|iPad|iPod/.test(userAgent) || 
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  };
  
  
  const openAndSaveCard = () => {
    const card_id = "677e036bee9675ee44b3dc65"; // Example data
    const card_owner_id = "677e01aeee9675ee44b3dc43"; // Example data
    const encodedData = encodeURIComponent(JSON.stringify({ cardId: card_id, ownerId: card_owner_id }));
    const universalLink = `https://deeplink-kappa.vercel.app/open?id=${encodedData}`; // Your Universal Link

    const appStoreLink_Android = 'YOUR_ANDROID_APP_STORE_LINK'; // Replace with your Android app store link
    const appStoreLink_iOS = 'YOUR_IOS_APP_STORE_LINK'; // Replace with your iOS app store link


    if (isIOS()) {
        const startTime = Date.now();
        window.location = universalLink; // Try to open the app

        setTimeout(() => {
          const endTime = Date.now();
          if (endTime - startTime < 2500) { // Check if the app opened (adjust timeout if needed)
            window.location = appStoreLink_iOS; // Redirect to App Store if app didn't open
          }
        }, 2000); // Small delay to allow app to open

      } else if (isAndroid()) {
        window.location = universalLink; // Try to open the app

        setTimeout(() => {
          // Use an iframe to check if the app opened (more reliable on Android)
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = universalLink;  // Try the link again in the iframe
          document.body.appendChild(iframe);

          setTimeout(() => {
            document.body.removeChild(iframe); // Remove the iframe
            window.location = appStoreLink_Android; // Redirect to Play Store if app didn't open
          }, 250); // Small delay
        },2000)
      } else {
        // Fallback for other platforms (optional)
        alert("This feature is only available on iOS and Android.");
      }
  };
  



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
          <div className="cIcon ml-10 purpleBg" 
          // onClick={() => { openAndSaveCard() }}
          onClick={openAndSaveCard}
          >
          Save Card3
          </div>
      </main>
    </div>
  );
}
