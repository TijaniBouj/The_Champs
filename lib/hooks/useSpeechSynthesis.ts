// hooks/useSpeechSynthesis.ts
import { useEffect } from 'react';

export const useSpeechSynthesis = (text: string) => {
  useEffect(() => {
    if (text) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }
  }, [text]);
};
