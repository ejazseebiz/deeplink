"use client"

export default function Home() {

  // Helper function for device detection
  // const isiOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = () => /Android/i.test(navigator.userAgent);

  const isiOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return (
      /iPhone|iPad|iPod/.test(userAgent) || 
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  };
  
  
  const openAndSaveCard = () => {
    try {
      // let fallbackLink = '';

      if (isiOS() || isAndroid()) {

        const card_id = "677e036bee9675ee44b3dc65";
        const card_owner_id = "677e01aeee9675ee44b3dc43";
  
        const card_for_saved = {
          "cardId": card_id,
          "ownerId": card_owner_id
        };

        

        // console.log("=-=-card_for_saved",card_for_saved)
        // const encodedData = encodeURIComponent(JSON.stringify(card_for_saved));
        //   window.location.href = `saveseecard://open?id=${encodedData}`;
        //   const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.seecard';
        //   const iosAppStoreLink = 'https://apps.apple.com/np/app/seecard/id6502513661';
        //   fallbackLink = isAndroid() ? androidAppStoreLink : iosAppStoreLink;
        //   const timeout = setTimeout(function () {
        //       if (document.hasFocus()) {
        //         window.location.href = fallbackLink;
        //       }
        //   }, 2000);
  
        //   window.addEventListener('blur', () => {
        //       clearTimeout(timeout);;
        //   });


          
        console.log("=-=-card_for_saved", card_for_saved);

        // ✅ Encode data
        const encodedData = encodeURIComponent(JSON.stringify(card_for_saved));
    
        // ✅ Custom URL scheme for app deep linking
        const deepLink = `saveseecard://open?id=${encodedData}`;
    
        // ✅ App Store fallback links
        const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.seecard';
        const iosAppStoreLink = 'https://apps.apple.com/np/app/seecard/id6502513661';
        const fallbackLink = isiOS() ? iosAppStoreLink : androidAppStoreLink;
    
        // ✅ Create an iframe to open the deep link (prevents Safari error)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = deepLink;
        document.body.appendChild(iframe);
    
        // ✅ Set timeout to redirect to the App Store if the app is not installed
        setTimeout(() => {
          window.location.href = fallbackLink;
        }, 2000);
    
        // ✅ Clean up iframe to prevent memory leaks
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 3000);
          
      } else {
        alert("Your device doesn't support deep linking for this app.");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };
  



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">


        <h1>Open Universal Link</h1>
        <a href="https://deeplink-kappa.vercel.app/" target="_blank">Open Link</a>
        <hr />


        
          <div className="cIcon ml-10 purpleBg" 
          // onClick={() => { openAndSaveCard() }}
          onClick={openAndSaveCard}
          >
          <p className="container-text">Save Card</p>
          </div>
          
        


        <h1>Open MyChat App</h1>
        <a href="mychat://open">Open App</a>
        

      </main>
    </div>
  );
}
