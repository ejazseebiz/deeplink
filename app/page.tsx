"use client"

export default function Home() {

  // Helper function for device detection
  // const isiOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = () => /Android/i.test(navigator.userAgent);

  const isiOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /iPhone|iPad|iPod/.test(userAgent);
  };
  
  const openAndSaveCard = () => {
    try {
      let fallbackLink = '';
      alert(isiOS());

      alert(navigator.userAgent);
      alert(navigator.platform);

      if (isiOS() || isAndroid()) {

        const card_id = "677e036bee9675ee44b3dc65";
        const card_owner_id = "677e01aeee9675ee44b3dc43";
  
        const card_for_saved = {
          "cardId": card_id,
          "ownerId": card_owner_id
        };
  
        console.log("=-=-card_for_saved", card_for_saved);
        const encodedData = encodeURIComponent(JSON.stringify(card_for_saved));
        window.location.href = `saveseecard://open?id=${encodedData}`;
  
        // App Store / Play Store links
        const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.seecard';
        const iosAppStoreLink = 'https://apps.apple.com/np/app/seecard/id6502513661';
        fallbackLink = isAndroid() ? androidAppStoreLink : iosAppStoreLink;
  
        // Delay the fallback
        const timeout = setTimeout(() => {
          if (document.visibilityState === "visible") {
            window.open(fallbackLink, "_blank"); // Open App Store in a new tab
          }
        }, 2000);
  
        // If user switches to another app (app is installed), cancel the timeout
        window.addEventListener('blur', () => clearTimeout(timeout));
      } else {
        alert("Your device doesn't support deep linking for this app.");
      }
    } catch (e) {
      alert("sssss");
      console.log("catch error print -------------------", JSON.stringify(e));
    }
  };
  



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">


        <h1>Open Universal Link</h1>
        <a href="https://deeplink-kappa.vercel.app/" target="_blank">Open Link</a>
        <hr />


        
          <div className="cIcon ml-10 purpleBg" onClick={() => { openAndSaveCard() }}>
          <p className="container-text">Save Card</p>
          </div>
          
        


        <h1>Open MyChat App</h1>
        <a href="mychat://open">Open App</a>
        

      </main>
    </div>
  );
}
