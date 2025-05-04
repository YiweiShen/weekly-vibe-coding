// src/components/HeroSection.jsx
import React from 'react'

function HeroSection() {
  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
            The Email Client
            <br />
            <span className="text-blue-600">Made for Mac</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Experience email the way it should be. Clean, fast, and beautifully
            designed for the Mac ecosystem you love.
          </p>
          <div className="mt-10">
            <a
              href="#download"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Download for macOS
            </a>
          </div>
        </div>
        <div className="mt-16 relative">
          <img
            src="/assets/images/macbook-mockup.png"
            alt="Pulse App on MacBook"
            className="mx-auto w-full max-w-4xl rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
