'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col justify-center items-center bg-gray-800">
      <motion.h1
        className="text-8xl font-bold mb-8 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Welcome To Beemo
      </motion.h1>
      <motion.p
        className="text-2xl mb-6 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        Explore the features of our AI Chatbot
      </motion.p>
      <motion.img
        src="/bmoo.png"
        alt="Beemo Logo"
        className="w-40 h-40 mb-6"
        animate={{
          rotate: [0, 360],
          transition: { repeat: Infinity, duration: 10, ease: 'linear' },
        }}
      />
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      >
        <a
          href="/signup"
          className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg transform transition-transform hover:scale-105"
        >
          Get Started
        </a>
      </motion.div>
      <motion.div
        className="absolute bottom-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        <p className="text-lg">
          Already have an account?{' '}
          <a href="/login" className="underline hover:text-gray-300">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
