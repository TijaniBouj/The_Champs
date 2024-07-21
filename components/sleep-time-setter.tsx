import Cookies from 'js-cookie'
import React, { useState } from 'react'

export default function SleepTimeSetter() {
  const [sleepStartHour, setSleepStartHour] = useState(
    Cookies.get('sleepStartHour') ? Cookies.get('sleepStartHour') : '22'
  ) // Default start at 10 PM
  const [sleepDuration, setSleepDuration] = useState(
    Cookies.get('sleepDuration') ? Cookies.get('sleepDuration') : '8'
  ) // Default duration 8 hours

  const handleSleepStartHourChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSleepStartHour(e.target.value)
    Cookies.set('sleepStartHour', e.target.value, { expires: 1 })
  }

  const handleSleepDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSleepDuration(e.target.value)
    Cookies.set('sleepDuration', e.target.value, { expires: 1 })
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Set Sleep Time
      </h2>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Use the sliders below to set the sleep time for the child.{' '}
        <span className="font-bold">Beemo</span> will be disabled during this
        time.
      </p>
      <div className="py-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="relative mb-6 lg:mb-0 lg:grow">
            <label htmlFor="sleep-start-hour" className="sr-only">
              Sleep Start Hour
            </label>
            <input
              id="sleep-start-hour"
              type="range"
              value={sleepStartHour}
              min="0"
              max="23"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={handleSleepStartHourChange}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6 w-full">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>5 PM</span>
              <span>11 AM</span>
            </div>
          </div>
          <div className="text-center mt-2 lg:mt-0 lg:ml-4 lg:text-right">
            <span className="text-gray-700 dark:text-gray-300">
              Start Hour: {sleepStartHour}:00
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center py-8">
          <div className="relative mb-6 lg:mb-0 lg:grow">
            <label htmlFor="sleep-duration" className="sr-only">
              Sleep Duration
            </label>
            <input
              id="sleep-duration"
              type="range"
              value={sleepDuration}
              min="1"
              max="12"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={handleSleepDurationChange}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6 w-full">
              <span>1 hour</span>
              <span>6 hours</span>
              <span>12 hours</span>
            </div>
          </div>
          <div className="text-center mt-2 lg:mt-0 lg:ml-4 lg:text-right">
            <span className="text-gray-700 dark:text-gray-300">
              Duration: {sleepDuration} hours
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
