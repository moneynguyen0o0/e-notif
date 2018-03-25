export const speech = (text, options = {}) => {
  if (window && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
    const msg = new SpeechSynthesisUtterance(text);
    const {
      lang,
      onend
    } = options;

    if (lang) {
      msg.lang = lang;
    }

    if (typeof onend === 'function') {
      msg.onend = onend;
    }

    window.speechSynthesis.speak(msg);
  } else {
    alert('This browser does not support Speech');
  }
};
