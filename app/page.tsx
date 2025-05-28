"use client";
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export default function Home() {
function shareThis(title: string, message: string, url: string) {
  const data = {
    type: 'share',
    payload: { title, message, url }
  };

  try {
    if (window.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    } else if (navigator.share) {
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
      prompt('Copy to clipboard:', url);
    }
  } catch (error) {
    console.error("Error initiating share:", error);
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
