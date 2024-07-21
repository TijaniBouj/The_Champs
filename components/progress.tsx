import clsx from 'clsx'
import React from 'react'

const UploadProgressForm = () => {
  const goals = [
    {
      name: 'Learn new Words: 12/12',
      progress: 100
    },
    {
      name: 'Read For 240 Minutes: 240/180',
      progress: 75
    },
    {
      name: 'Have 10 Interactive Sessions: 10/10',
      progress: 100
    }
  ]

  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-transparent dark:border-neutral-700">
      <div className="p-4 md:p-5 space-y-7">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="mb-2 flex justify-between items-center">
              <div className="flex items-center gap-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {goal.name}
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-x-2">
                {goal.progress === 100 && (
                  <svg
                    className="shrink-0 size-4 text-teal-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                  </svg>
                )}
              </div>
            </div>
            <div
              className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
              role="progressbar"
              aria-valuenow={goal.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={clsx(
                  'flex flex-col justify-center rounded-full overflow-hidden  text-xs text-white text-center whitespace-nowrap transition duration-500',
                  {
                    'bg-teal-500': goal.progress === 100,
                    'bg-blue-500': goal.progress < 100
                  }
                )}
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-t border-gray-200 rounded-b-xl py-2 px-4 md:px-5 dark:bg-white/10 dark:border-neutral-700">
        <div className="flex flex-wrap justify-between items-center gap-x-3">
          <div>
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              1 left
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadProgressForm
