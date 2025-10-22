import { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = document.createElement("script");
    addScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; // ✅ Use https
    addScript.async = true;
    document.body.appendChild(addScript);

    // Initialize translation widget
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,ta,te,kn,ml,bn,mr,gu,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div>
      <div
        id="google_translate_container"
        style={{
          position: "fixed",
          top: "15px",
          right: "180px",
          zIndex: 9999,
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "6px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          transform: "scale(0.9)",
        }}
      >
        <div id="google_translate_element"></div>
      </div>

      {/* 📱 Responsive adjustments */}
      <style>
        {`
          @media (max-width: 600px) {
            #google_translate_container {
              top: 10px !important;
              right: 230px !important;
              transform: scale(0.8);
            }
          }
        `}
      </style>
    </div>
  );
};
 
export default GoogleTranslate;