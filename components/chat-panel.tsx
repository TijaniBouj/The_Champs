// components/ChatPanel.tsx
import * as React from 'react'
import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { FaMicrophone } from 'react-icons/fa'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
  onVoiceInput: () => void
  listening: boolean
  transcript: string
  resetTranscript: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  onVoiceInput,
  listening,
  transcript,
  resetTranscript
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  const exampleMessages = [
    {
      heading: 'How to Identify',
      subheading: 'Signs of ASD in Children',
      message: 'What are the early signs of ASD in children?'
    },
    {
      heading: 'Ways to Support',
      subheading: 'Children with ASD',
      message: 'How can I support my child who has ASD?'
    },
    {
      heading: 'Understanding ASD',
      subheading: 'Causes and Treatments',
      message: 'What causes ASD and what treatments are available?'
    },
    {
      heading: 'Resources for Parents',
      subheading: 'of Children with ASD',
      message: 'What resources are available for parents of children with ASD?'
    }
  ]

  const handleVoiceButtonClick = async () => {
    if (listening) {
      // This will stop the listening and submit the input
      onVoiceInput()

      const trimmedInput = transcript.trim()
      if (!trimmedInput) return

      // Optimistically add user message UI
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <UserMessage>{trimmedInput}</UserMessage>
        }
      ])

      // Submit and get response message
      const responseMessage = await submitUserMessage(trimmedInput)
      setMessages(currentMessages => [...currentMessages, responseMessage])

      // Clear input after submission
      resetTranscript()
    } else {
      // This will start the listening
      onVoiceInput()
    }
  }

  React.useEffect(() => {
    if (!listening && transcript.trim()) {
      handleVoiceButtonClick()
    }
  }, [listening])

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  const responseMessage = await submitUserMessage(
                    example.message
                  )

                  setMessages(currentMessages => [
                    ...currentMessages,
                    responseMessage
                  ])
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} />
          <div className="flex items-center justify-between">
            <button
              onClick={handleVoiceButtonClick}
              className={`p-2 border rounded-full ${
                listening ? 'bg-red-500' : 'bg-blue-500'
              }`}
            >
              <FaMicrophone className="text-white" />
            </button>
            <FooterText className="hidden sm:block" />
          </div>
        </div>
      </div>
    </div>
  )
}
