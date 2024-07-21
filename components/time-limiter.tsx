'use client'
import Cookies from 'js-cookie'
import React, { useState } from 'react'

export default function TimeLimiter() {
  const [timeLimit, setTimeLimit] = useState(
    Cookies.get('timeLimit') ? Cookies.get('timeLimit') : 60
  ) // Default to 60 minutes

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeLimit(e.target.value)
    Cookies.set('timeLimit', e.target.value, { expires: 1 })
  }

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Set Daily Time Limit
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Use the slider below to set the amount of time (in minutes) the child is
        allowed to use <span className="font-bold">Beemo</span> per day. If the
        time limit is reached, <span className="font-bold">Beemo</span> will be
        disabled.
      </p>

      <div className="mb-4 flex flex-col lg:flex-row lg:items-center">
        <div className="relative mb-6 lg:mb-0 lg:grow">
          <label htmlFor="time-limit-slider" className="sr-only">
            Time Limit
          </label>
          <input
            id="time-limit-slider"
            type="range"
            value={timeLimit}
            min="10"
            max="240"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={handleSliderChange}
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6 w-full">
            <span>10 mins</span>
            <span>60 mins</span>
            <span>120 mins</span>
            <span>180 mins</span>
            <span>240 mins</span>
          </div>
        </div>
        <div className="text-center mt-2 lg:mt-0 lg:ml-4 lg:text-right">
          <span className="text-gray-700 dark:text-gray-300">
            Selected Time Limit: {timeLimit} minutes
          </span>
        </div>
      </div>
    </div>
  )
}
