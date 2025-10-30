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
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,ta,te,kn,ml,bn,mr,gu,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>

      <style>{`
  /* Container */
  #google_translate_element {
    display: inline-block;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    padding: 3px 8px;
    background-color: #fff;
    font-family: Arial, sans-serif;
    font-size: 13px;
    box-shadow: 0 0 4px rgba(0,0,0,0.1);
  }

  /* Hide "Powered by Google" text */
  .goog-logo-link, .goog-te-gadget > span {
    display: none !important;
  }

  /* Keep the Google G icon visible and centered */
  .goog-te-gadget img,
  .goog-te-gadget-icon {
    width: 18px !important;
    height: 18px !important;
    margin-right: 6px !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }

  /* Align the select box and icon nicely */
  .goog-te-gadget-simple {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
  }

  /* Dropdown style */
  .goog-te-combo {
    border: none !important;
    background: transparent !important;
    outline: none !important;
    font-size: 14px !important;
    color: #000 !important;
    cursor: pointer !important;
  }

  /* Remove Google’s top banner completely */
  .goog-te-banner-frame.skiptranslate {
    display: none !important;
  }
  body {
    top: 0 !important;
  }
`}</style>
    </div>
  );
};

export default GoogleTranslate;
