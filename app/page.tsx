"use client"

export default function Home() {
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
      if (isiOS() || isAndroid()) {

        const card_id = "677e036bee9675ee44b3dc65";
        const card_owner_id = "677e01aeee9675ee44b3dc43";
  
        const card_for_saved = {
          "cardId": card_id,
          "ownerId": card_owner_id
        };
        
        const encodedData = encodeURIComponent(JSON.stringify(card_for_saved));
        const deepLink = `saveseecard://open?id=${encodedData}`;

          // alert('1');
          // window.location.href = `saveseecard://open?id=${encodedData}`;
          // alert('2');
   

          const androidAppStoreLink = 'https://play.google.com/store/apps/details?id=com.seecard';
          const iosAppStoreLink = 'https://apps.apple.com/np/app/seecard/id6502513661';
          const fallbackLink = isAndroid() ? androidAppStoreLink : iosAppStoreLink;
          let hasFocus = true;

          const handleBlur = () => {
            hasFocus = false;
          };
  
          window.addEventListener('blur', handleBlur);
  
          window.location.href = deepLink;
  
          setTimeout(() => {
            window.removeEventListener('blur', handleBlur);
            if (hasFocus) {
              alert("The app could not be opened. Please install it from the store.");
              window.location.href = fallbackLink;
            }
          }, 2000);
          
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
        
          <div className="cIcon ml-10 purpleBg" 
          // onClick={() => { openAndSaveCard() }}
          onClick={openAndSaveCard}
          >
          Save Card2
          </div>
      </main>
    </div>
  );
}
