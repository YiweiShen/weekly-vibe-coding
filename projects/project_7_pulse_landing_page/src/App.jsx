// src/App.jsx
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <section id="download" className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Ready to transform your email experience?
            </h2>
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              Download for macOS
            </a>
            <p className="mt-4 text-blue-100">Compatible with macOS 11.0 or later</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;