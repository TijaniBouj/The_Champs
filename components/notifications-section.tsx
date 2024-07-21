'use client'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState<{
    emotions: boolean
    repetetiveQuestions: boolean
    agitatedBehavior: boolean
  }>(
    Cookies.get('notifications')
      ? JSON.parse(Cookies.get('notifications') as string)
      : {
          emotions: false,
          repetetiveQuestions: false,
          agitatedBehavior: false
        }
  )
  const [hasChanged, setHasChanged] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasChanged(true)
    const { id, checked } = event.target
    setNotifications(prevNotifications => ({
      ...prevNotifications,
      [id]: checked
    }))
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Store notifications in cookies
    Cookies.set('notifications', JSON.stringify(notifications))
    setHasChanged(false)
  }
  const handleResetButton = () => {
    // Reset form to initial state
    const initialState = Cookies.get('notifications')
      ? JSON.parse(Cookies.get('notifications') as string)
      : {
          emotions: false,
          repetetiveQuestions: false,
          agitatedBehavior: false
        }
    setNotifications(initialState)
  }

  const handleCancel = () => {
    // Reset form to initial state
    setNotifications({
      emotions: false,
      repetetiveQuestions: false,
      agitatedBehavior: false
    })
    setHasChanged(false)
  }

  return (
    <form onSubmit={handleFormSubmit} onReset={handleCancel}>
      <div className="border-b border-gray-900/10 pb-8">
        <div className="mt-8 space-y-8">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Push Notifications
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              These are delivered via SMS to your mobile phone.
            </p>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="emotions"
                    name="emotions"
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={notifications.emotions}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="emotions"
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    High Emotional Engagement Notification:
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get notified when the child exhibits signs of high emotional
                    engagement during interactions with{' '}
                    <span className="font-bold">Beemo</span>.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="repetetiveQuestions"
                    name="repetetiveQuestions"
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={notifications.repetetiveQuestions}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="repetetiveQuestions"
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    Repetitive Questions Notification
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get notified when the child repeatedly asks the same
                    question to <span className="font-bold">Beemo </span>
                    within a short period.
                  </p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="agitatedBehavior"
                    name="agitatedBehavior"
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={notifications.agitatedBehavior}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="agitatedBehavior"
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    Agitated Behavior Detection
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get notified when the child displays signs of agitation or
                    distress during interactions with{' '}
                    <span className="font-bold">Beemo</span>.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="my-8 flex justify-end gap-x-6">
        <button
          type="reset"
          disabled={!hasChanged}
          onClick={handleResetButton}
          className="text-sm font-medium px-4 py-2 text-gray-700 hover:text-gray-900 disabled:text-gray-500 disabled:hover:text-gray-700 bg-white rounded-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!hasChanged}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed "
        >
          Save
        </button>
      </div>
    </form>
  )
}
