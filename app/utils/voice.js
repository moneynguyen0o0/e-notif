export const speech = (text) => {
  if (window && 'speechSynthesis' in window && 'SpeechRecognition' in window) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  } else {
    alert('This browser does not support Speech');
  }
}