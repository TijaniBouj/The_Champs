import Cookies from 'js-cookie'
import React, { useState } from 'react'

export default function GoalSetter() {
  const [wordGoal, setWordGoal] = useState(
    Cookies.get('wordGoal') ? Cookies.get('wordGoal') : '25'
  )
  const [readingTime, setReadingTime] = useState(
    Cookies.get('readingTime') ? Cookies.get('readingTime') : '30'
  )
  const [sessionsPerWeek, setSessionsPerWeek] = useState(
    Cookies.get('sessionsPerWeek') ? Cookies.get('sessionsPerWeek') : '1'
  )

  const handleWordGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordGoal(e.target.value)

    Cookies.set('wordGoal', e.target.value, { expires: 1 })
  }

  const handleReadingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReadingTime(e.target.value)

    Cookies.set('readingTime', e.target.value, { expires: 1 })
  }

  const handleSessionsPerWeekChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionsPerWeek(e.target.value)

    Cookies.set('sessionsPerWeek', e.target.value, { expires: 1 })
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Set Learning Goals
      </h2>

      <div className="mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Use the sliders below to set the goals for the child.
        </p>

        <div className="py-6 flex flex-col lg:flex-row lg:items-center">
          <div className="relative mb-6 lg:mb-0 lg:grow">
            <label htmlFor="word-goal-slider" className="sr-only">
              New Words per Week
            </label>
            <input
              id="word-goal-slider"
              type="range"
              value={wordGoal}
              min="1"
              max="50"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={handleWordGoalChange}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6 w-full">
              <span>1 word</span>
              <span>17 words</span>
              <span>33 words</span>
              <span>50 words</span>
            </div>
          </div>
          <div className="text-center mt-2 lg:mt-0 lg:ml-4 lg:text-right">
            <span className="text-gray-700 dark:text-gray-300">
              Selected Goal: {wordGoal} new words per week
            </span>
          </div>
        </div>

        <div className="py-6 flex flex-col lg:flex-row lg:items-center">
          <div className="relative mb-6 lg:mb-0 lg:grow">
            <label htmlFor="reading-time-slider" className="sr-only">
              Reading Time per Day
            </label>
            <input
              id="reading-time-slider"
              type="range"
              value={readingTime}
              min="5"
              max="120"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={handleReadingTimeChange}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6 w-full">
              <span>5 minutes</span>
              <span>45 minutes</span>
              <span>80 minutes</span>
              <span>120 minutes</span>
            </div>
          </div>
          <div className="text-center mt-2 lg:mt-0 lg:ml-4 lg:text-right">
            <span className="text-gray-700 dark:text-gray-300">
              Selected Goal: {readingTime} minutes of reading per day
            </span>
          </div>
        </div>

        <div className="py-6 flex flex-col lg:flex-row lg:items-center">
          <div className="relative mb-6 lg:mb-0 lg:grow">
            <label htmlFor="sessions-per-week-slider" className="sr-only">
              Interactive Sessions per Week
            </label>
            <input
              id="sessions-per-week-slider"
              type="range"
              value={sessionsPerWeek}
              min="1"
              max="14"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={handleSessionsPerWeekChange}
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6 w-full">
              <span>1 session</span>
              <span>5 sessions</span>
              <span>10 sessions</span>
              <span>14 sessions</span>
            </div>
          </div>
          <div className="text-center mt-2 lg:mt-0 lg:ml-4 lg:text-right">
            <span className="text-gray-700 dark:text-gray-300">
              Selected Goal: {sessionsPerWeek} interactive sessions per week
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
