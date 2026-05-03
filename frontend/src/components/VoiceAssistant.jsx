import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function VoiceAssistant({ onVoiceInput }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onstart = () => setIsListening(true);
      recog.onend = () => setIsListening(false);
      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
      };
      setRecognition(recog);
    } else {
      // Speech recognition not supported
    }
  }, [onVoiceInput]);

  const toggleListen = useCallback(() => {
    if (!recognition) {
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  }, [recognition, isListening]);

  return (
    <button 
      onClick={toggleListen}
      aria-label={isListening ? "Stop voice assistant" : "Start voice assistant"}
      aria-pressed={isListening}
      className={`p-3 rounded-full transition-all flex items-center justify-center text-white shadow-lg
        ${isListening ? 'bg-red-500 animate-pulse' : 'bg-secondary hover:bg-purple-600'}`}
      title={isListening ? "Listening..." : "Click to speak"}
    >
      {isListening ? <MicOff size={20} aria-hidden="true" /> : <Mic size={20} aria-hidden="true" />}
    </button>
  );
}

export const speak = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha'));
    if (voice) utterance.voice = voice;
    
    window.speechSynthesis.speak(utterance);
  }
};
