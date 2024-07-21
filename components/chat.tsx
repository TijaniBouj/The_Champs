'use client'

import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { usePathname, useRouter } from 'next/navigation'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { useSpeechRecognition } from '@/lib/hooks/useSpeechRecognition'
import { useSpeechSynthesis } from '@/lib/hooks/useSpeechSynthesis'
import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { Message, Session } from '@/lib/types'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } = useScrollAnchor()

  const [newChatId, setNewChatId] = useLocalStorage('newChatId', id)

  const handleVoiceSubmit = (transcript: string) => {
    setInput(transcript)
    // Automatically submit the input here
    // For example, if you have a submitInput function:
    
  }

  const { transcript, listening, setListening, resetTranscript } = useSpeechRecognition(handleVoiceSubmit)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  }, [id, setNewChatId])

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const handleVoiceInput = () => {
    setListening(!listening)
  }

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        onVoiceInput={handleVoiceInput}
        listening={listening}
        transcript={transcript}
        resetTranscript={resetTranscript}
      />
    </div>
  )
}
