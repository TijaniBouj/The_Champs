// lib/chat/actions.ts
'use server'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  createStreamableValue
} from 'ai/rsc'

import { BotCard, BotMessage, SystemMessage } from '@/components/stocks'

import { nanoid } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'

const url = 'https://api.together.xyz/v1/chat/completions'
const apiKey = process.env.TOGETHER_API_KEY

const headers = new Headers({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiKey}`,
})

async function callTogetherAPI(messages: Message[]) {
  const data = {
    model: 'meta-llama/Llama-3-70b-chat-hf',
    max_tokens: 500,
    messages: [
      {
        role: 'system',
        content: 'You are a specialist with kids with autism, act as one that listens to their questions and then answers them. Do not mention that you are a doctor; you are here to help.',
      },
      ...messages,
    ],
  }

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url, options)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await callTogetherAPI(aiState.get().messages)

  if (result && result.choices) {
    const botMessage = result.choices[0].message.content
    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'assistant',
          content: botMessage
        }
      ]
    })
    textNode = <BotMessage content={botMessage} />
  }

  return {
    id: nanoid(),
    display: textNode
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display: message.role === 'user' ? (
        <div>{message.content as string}</div>
      ) : message.role === 'assistant' && typeof message.content === 'string' ? (
        <BotMessage content={message.content} />
      ) : null
    }))
}
