"use client";
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

  const isIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return (
      /iPhone|iPad|iPod/.test(userAgent) || 
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  };
  

export default function Home() {

const handleShare = async () => {
    try {
      // const link = purchaseRound?.purchase_round_link.split("?")[1];
      // await navigator.clipboard.writeText(`${window.location.href}?${link}`);
      await navigator.clipboard.writeText("${window.location.href}?${link}");
      alert("Link copied to clipboard!");
    } catch (err) {
      console.log("Failed to copy link.", err);
    }
  };

const shareThis = (title: string, message: string, url: string) => {
  const data = {
    type: 'share',
    payload: { title, message, url }
  };

  try {
    if (window.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    } else if (isIOS() && navigator.share) {
      navigator
        .share({ title, text: message, url })
        .then(() => {
          console.log("Share successful");
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Share dialog was closed by the user.");
          } else {
            console.error("Unexpected error while sharing:", error);
          }
        });
    } else {
      handleShare();
    }
  } catch (error) {
    console.error("Error initiating share:", error);
    handleShare();
  }
}
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={() =>
          shareThis(
            "Check this out!",
            "This is a great website.",
            "https://example.com"
          )
        }
        style={buttonStyle}
      >
        Share
      </button>

            <button
        onClick={() =>
          handleShare()
        }
        style={buttonStyle}
      >
        Copy
      </button>


      <a href="https://card.seebiz.com/rizwanwork-559E476088"></a>
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
