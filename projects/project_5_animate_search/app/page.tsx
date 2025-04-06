'use client'

import { useEffect, useState, useRef } from 'react'
import { Search, Rocket } from 'lucide-react'
import { Input } from '@/components/ui/input'
import DocumentCard from '@/components/document-card'
import ParticleBackground from '@/components/particle-background'
import HyperspaceEffect from '@/components/hyperspace-effect'
import { mockDocuments } from '@/lib/mock-data'
import { animateSearchBar } from '@/lib/animations'

export default function Home() {
  const [query, setQuery] = useState('')
  const [documents, setDocuments] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showHyperspace, setShowHyperspace] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(true)
  const searchBarRef = useRef(null)
  const resultsRef = useRef(null)
  const searchButtonRef = useRef(null)
  const searchFormRef = useRef(null)
  const flyingButtonRef = useRef(null)

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()

    if (isSearching) return

    setIsSearching(true)
    setShowResults(false)

    // Remove existing flying buttons
    const existingFlyingButtons = document.querySelectorAll('.flying-button')
    existingFlyingButtons.forEach((button) => {
      document.body.removeChild(button)
    })

    // Animate search button
    const searchButton = searchButtonRef.current
    if (searchButton) {
      const buttonRect = searchButton.getBoundingClientRect()
      const flyingButton = searchButton.cloneNode(true)

      flyingButton.style.position = 'fixed'
      flyingButton.style.top = `${buttonRect.top}px`
      flyingButton.style.left = `${buttonRect.left}px`
      flyingButton.style.width = `${buttonRect.width}px`
      flyingButton.style.height = `${buttonRect.height}px`
      flyingButton.style.zIndex = '1000'
      flyingButton.classList.add('fly-away', 'flying-button')

      const trailEffect = document.createElement('div')
      trailEffect.className = 'starship-trail'
      flyingButton.appendChild(trailEffect)

      document.body.appendChild(flyingButton)
      flyingButtonRef.current = flyingButton

      setButtonVisible(false)

      setTimeout(() => {
        if (
          flyingButtonRef.current &&
          document.body.contains(flyingButtonRef.current)
        ) {
          document.body.removeChild(flyingButtonRef.current)
          flyingButtonRef.current = null
        }
      }, 1500)
    }

    // Show hyperspace
    setTimeout(() => {
      setShowHyperspace(true)
    }, 300)

    // Filter or reset documents
    const results = !query.trim()
      ? mockDocuments
      : mockDocuments.filter(
          (doc) =>
            doc.title.toLowerCase().includes(query.toLowerCase()) ||
            doc.content.toLowerCase().includes(query.toLowerCase())
        )

    setTimeout(() => {
      setShowHyperspace(false)
      setDocuments(results)

      setTimeout(() => {
        setShowResults(true)
        setTimeout(() => {
          setIsSearching(false)
          setButtonVisible(true)
        }, 1000)
      }, 500)
    }, 1800)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (
        flyingButtonRef.current &&
        document.body.contains(flyingButtonRef.current)
      ) {
        document.body.removeChild(flyingButtonRef.current)
      }
    }
  }, [])

  // Initialize animations
  useEffect(() => {
    if (searchBarRef.current) {
      animateSearchBar(searchBarRef.current)
    }
  }, [])

  // Show all documents on mount
  useEffect(() => {
    setDocuments(mockDocuments)
    setShowResults(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />
      <HyperspaceEffect active={showHyperspace} />

      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl flex flex-col items-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Animate Search
          </h1>

          <div
            ref={searchBarRef}
            className="w-full max-w-2xl mt-16 mb-8 opacity-0 transition-all duration-1000 ease-out"
            style={{ transform: 'translateY(-50px)' }}
          >
            <form
              ref={searchFormRef}
              onSubmit={handleSearch}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-black rounded-lg p-1">
                  <div className="flex items-center bg-gray-900 rounded-md px-4 py-2">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <Input
                      type="text"
                      placeholder="Search the knowledge base..."
                      className="flex-1 border-none bg-transparent text-white focus:outline-none focus:ring-0 text-lg"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      disabled={isSearching}
                    />
                    <div
                      className="search-button-container"
                      style={{ opacity: buttonVisible ? 1 : 0 }}
                    >
                      <button
                        ref={searchButtonRef}
                        type="submit"
                        className="ml-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md font-medium text-white hover:opacity-90 transition-all duration-300 flex items-center"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <span className="flex items-center">
                            <Rocket className="h-4 w-4 mr-2" />
                            Searching...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Rocket className="h-4 w-4 mr-2" />
                            Search
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div
            ref={resultsRef}
            className="search-results-container mt-8"
            style={{
              opacity: showResults ? 1 : 0,
              transition: 'opacity 0.8s ease',
              display: showResults ? 'block' : 'none'
            }}
          >
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 zoom-in">
                {documents.map((doc, index) => (
                  <DocumentCard key={doc.id} document={doc} index={index} />
                ))}
              </div>
            ) : query && showResults ? (
              <div className="text-center text-gray-400 mt-8 zoom-in">
                No documents found matching your query
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}
