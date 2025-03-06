import React, { useState } from "react";

const SpeechToText: React.FC<{ onTextGenerated: (text: string) => void }> = ({ onTextGenerated }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      onTextGenerated(text);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
   
      <button
        onClick={startListening}
        className={`p-3 rounded-lg ${isListening ? "bg-red-500" : "bg-pink-500"}  w-full bg-blue-500 p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 text-white`}
      >
        {isListening ? "Listening..." : "Start Speaking"}
      </button>
    //   <p className="mt-3 font-semibold">{transcript}</p>
    
  );
};

export default SpeechToText;
