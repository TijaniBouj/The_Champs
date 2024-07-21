'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import TimeLimiter from './time-limiter'
import GoalSetter from './goal-setter'
import SleepTimeSetter from './sleep-time-setter'

export interface BlockedTopic {
  id: string
  topic: string
}

export default function BlockedTableForm() {
  return (
    <div className="md:px-6 bg-white dark:bg-gray-800 rounded-lg col-span-12 xl:col-span-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Blocked Topics
      </h2>

      <div className="mb-4">
        <SelectComponent />
        <TimeLimiter />
        <SleepTimeSetter />
        <GoalSetter />
      </div>
    </div>
  )
}

const SelectComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState<BlockedTopic[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [submittedTopics, setSubmittedTopics] = useState<BlockedTopic[]>(
    Cookies.get('blockedTopics')
      ? JSON.parse(Cookies.get('blockedTopics') as string)
      : []
  )

  const options = [
    { id: '1', topic: 'Hate' },
    { id: '2', topic: 'Sadness' },
    { id: '3', topic: 'Fear' },
    { id: '4', topic: 'Anger' },
    { id: '5', topic: 'Anxiety' },
    { id: '6', topic: 'Loneliness' },
    { id: '7', topic: 'Bullying' },
    { id: '8', topic: 'Depression' },
    { id: '9', topic: 'Confusion' },
    { id: '10', topic: 'Frustration' },
    { id: '11', topic: 'Isolation' },
    { id: '12', topic: 'Rejection' },
    { id: '13', topic: 'Grief' },
    { id: '14', topic: 'Guilt' },
    { id: '15', topic: 'Shame' },
    { id: '16', topic: 'Embarrassment' },
    { id: '17', topic: 'Stress' },
    { id: '18', topic: 'Panic' },
    { id: '19', topic: 'Mistreatment' },
    { id: '20', topic: 'Discrimination' },
    { id: '21', topic: 'Violence' },
    { id: '22', topic: 'Neglect' },
    { id: '23', topic: 'Withdrawal' },
    { id: '24', topic: 'Aggression' },
    { id: '25', topic: 'Self-harm' },
    { id: '26', topic: 'Loss' },
    { id: '27', topic: 'Abandonment' },
    { id: '28', topic: 'Betrayal' },
    { id: '29', topic: 'Obsession' },
    { id: '30', topic: 'Perfectionism' },
    { id: '31', topic: 'Phobia' },
    { id: '32', topic: 'Nightmares' },
    { id: '33', topic: 'Insecurity' },
    { id: '34', topic: 'Disappointment' },
    { id: '35', topic: 'Exclusion' },
    { id: '36', topic: 'Injustice' },
    { id: '37', topic: 'Worry' },
    { id: '38', topic: 'Lack of control' },
    { id: '39', topic: 'Overwhelm' },
    { id: '40', topic: 'Regression' }
  ]

  useEffect(() => {
    Cookies.set('blockedTopics', JSON.stringify(submittedTopics))
  }, [submittedTopics])

  const isOptionSubmitted = (option: BlockedTopic): boolean => {
    return submittedTopics.some(
      submitted =>
        submitted.id === option.id ||
        submitted.topic.trim().toLowerCase() ===
          option.topic.trim().toLowerCase()
    )
  }

  const handleSelect = (option: BlockedTopic) => {
    if (isOptionSubmitted(option)) return
    if (selectedOptions.some(selected => selected.id === option.id)) {
      handleRemove(option)
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
    setSearchTerm('')
  }

  const handleRemove = (option: BlockedTopic) => {
    setSelectedOptions(
      selectedOptions.filter(selected => selected.id !== option.id)
    )
  }
  const handleRemoveSubmittedTopic = (topic: BlockedTopic) => {
    setSubmittedTopics(
      submittedTopics.filter(submitted => submitted.id !== topic.id)
    )
    Cookies.set('blockedTopics', JSON.stringify(submittedTopics))
  }

  const handleKeyDown = (e: any) => {
    const filteredOptions = options.filter(option =>
      option.topic.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prevIndex => (prevIndex + 1) % filteredOptions.length)
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(
        prevIndex =>
          (prevIndex - 1 + filteredOptions.length) % filteredOptions.length
      )
    } else if (
      e.key === 'Enter' &&
      searchTerm.trim() !== '' &&
      !isOptionSubmitted({
        id: Date.now().toString(),
        topic: searchTerm.trim()
      }) &&
      !isOptionSelected({
        id: Date.now().toString(),
        topic: searchTerm.trim()
      })
    ) {
      if (highlightedIndex === -1) {
        const newOption = {
          id: Date.now().toString(),
          topic: searchTerm.trim()
        }
        handleSelect(newOption)
      } else {
        handleSelect(filteredOptions[highlightedIndex])
      }
      setHighlightedIndex(-1)
    }
  }

  const handleSubmit = () => {
    if (isOptionSubmitted({ id: Date.now().toString(), topic: searchTerm })) {
      return
    }
    if (searchTerm !== '') {
      const newOption = { id: Date.now().toString(), topic: searchTerm }
      setSubmittedTopics([...submittedTopics, newOption])
    }
    setSubmittedTopics((prevSubmittedTopics: BlockedTopic[]) => [
      ...prevSubmittedTopics,
      ...selectedOptions
    ])
    setSelectedOptions([])
    setSearchTerm('')
  }

  const doesOptionExist = (query: string): boolean => {
    return options.some(option =>
      option.topic.toLowerCase().includes(query.toLowerCase())
    )
  }

  const isOptionSelected = (option: BlockedTopic): boolean => {
    return selectedOptions.some(
      selected =>
        selected.id === option.id ||
        selected.topic.trim().toLowerCase() ===
          option.topic.trim().toLowerCase()
    )
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <div className="relative ps-0.5 pe-9 min-h-[46px] flex items-center flex-wrap text-nowrap w-full border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
            {selectedOptions.map(option => (
              <div
                key={option.id}
                className="flex flex-nowrap items-center relative z-10 bg-white border border-gray-200 rounded-full p-1 m-1 dark:bg-neutral-900 dark:border-neutral-700"
              >
                <div className="whitespace-nowrap pl-1 text-gray-800 dark:text-neutral-200">
                  {option.topic}
                </div>
                <div
                  className="inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer"
                  onClick={() => handleRemove(option)}
                >
                  <svg
                    className="shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </div>
              </div>
            ))}
            <input
              className="py-3 px-2 rounded-lg order-1 text-sm outline-none dark:bg-neutral-900 dark:placeholder:neutral-500 dark:text-neutral-400"
              type="text"
              placeholder="Select option..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setSearchTerm('')}
              onKeyDown={handleKeyDown}
            />
          </div>
          {searchTerm && doesOptionExist(searchTerm) && (
            <div className="mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700">
              {options
                .filter(option =>
                  option.topic.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option, index) => (
                  <div
                    key={option.id}
                    className={`py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800 ${
                      highlightedIndex === index
                        ? 'bg-gray-100 dark:bg-neutral-800'
                        : ''
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                          {option.topic}
                        </div>
                      </div>
                      <div>
                        {(isOptionSelected(option) ||
                          isOptionSubmitted(option)) && (
                          <CheckIcon className="text-blue-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <button
          className="p-2 min-h-[46px] bg-[#3C50E0] text-white rounded-lg min-w-28 self-start"
          onClick={handleSubmit}
        >
          Add Topic
        </button>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap">
          {submittedTopics.length === 0 && (
            <div className="min-h-60  flex flex-col w-full bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <svg
                  className="size-10 text-gray-500 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" x2="2" y1="12" y2="12"></line>
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  <line x1="6" x2="6.01" y1="16" y2="16"></line>
                  <line x1="10" x2="10.01" y1="16" y2="16"></line>
                </svg>
                <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">
                  No topics selected
                </p>
              </div>
            </div>
          )}
          {submittedTopics.map(topic => (
            <div
              key={topic.id}
              className="flex flex-nowrap items-center relative z-10 bg-white border border-gray-200 rounded-full p-1 m-1 dark:bg-neutral-900 dark:border-neutral-700"
            >
              <div className="whitespace-nowrap pl-1 text-gray-800 dark:text-neutral-200">
                {topic.topic}
              </div>
              <div
                className="inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer"
                onClick={() => handleRemoveSubmittedTopic(topic)}
              >
                <svg
                  className="shrink-0 size-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
