// src/components/TestimonialsSection.jsx
import React from 'react'

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The best email client I've ever used on Mac. Clean, fast, and incredibly intuitive.",
      author: 'Sarah Chen',
      role: 'Product Designer',
      image: '/assets/images/testimonial-1.png'
    },
    {
      quote:
        'Pulse has completely transformed how I handle my daily email communications.',
      author: 'Marcus Johnson',
      role: 'Software Engineer',
      image: '/assets/images/testimonial-2.png'
    },
    {
      quote:
        'Finally, an email client that truly understands the needs of Mac users.',
      author: 'Emma Wilson',
      role: 'Creative Director',
      image: '/assets/images/testimonial-3.png'
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Loved by Mac users worldwide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
