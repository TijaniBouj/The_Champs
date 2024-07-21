'use client'

import Cookies from 'js-cookie'
import { useState } from 'react'

export default function Warning({
  title,
  description
}: {
  title: string
  description: string
}) {
  const [show, setShow] = useState(
    Cookies.get('showWarning') === 'false' ? false : true
  )
  const handleShowWarning = () => {
    setShow(!show)
    Cookies.set('showWarning', JSON.stringify(!show), {
      expires: 1
    })
  }
  return (
    show && (
      <div
        className="bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
        role="alert"
      >
        <div className="flex">
          <div className="shrink-0">
            <svg
              className="shrink-0 size-4 mt-0.5"
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
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>
          <div className="ms-4">
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="mt-1 text-sm text-yellow-700">{description}</div>
          </div>
          <div className="ps-3 ms-auto">
            <div className="-m-1.5 ">
              <button
                onClick={handleShowWarning}
                type="button"
                className="inline-flex bg-teal-50 rounded-lg p-1.5 text-yellow-500 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600 dark:bg-transparent dark:hover:bg-yellow-800/50 dark:text-yellow-600"
                data-hs-remove-element="#dismiss-alert"
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
