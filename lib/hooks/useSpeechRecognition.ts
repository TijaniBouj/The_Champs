// hooks/useSpeechRecognition.ts
import { useState, useEffect } from 'react'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export const useSpeechRecognition = (
  onSubmit: (transcript: string) => void
) => {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const resetTranscript = () => {
    setTranscript('')
  }

  useEffect(() => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)()
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      const interimTranscript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('')
      setTranscript(interimTranscript)
    }

    recognition.onend = () => {
      setListening(false)
      onSubmit(transcript)
    }

    if (listening) {
      recognition.start()
    } else {
      recognition.stop()
    }

    return () => {
      recognition.stop()
    }
  }, [listening, onSubmit])

  return { transcript, listening, setListening, resetTranscript }
}
