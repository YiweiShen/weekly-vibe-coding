import { useState, useEffect } from 'react'
import ThreeScene from '../components/ThreeScene'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

const Index = () => {
  const [showOverlay, setShowOverlay] = useState(true)
  const [email, setEmail] = useState('')
  const [subscriberCount, setSubscriberCount] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch(
          'https://majestic-escarpment-fc69.codehooks.io/count',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': '8eeea164-9ec1-4b65-b5ac-f28c1ac9b9de'
            }
          }
        )
        const data = await response.json()
        const count = Number.isInteger(data.total_emails)
          ? data.total_emails
          : parseInt(data.total_emails) || 0
        setSubscriberCount(count)
      } catch (error) {
        console.error('Failed to fetch subscriber count:', error)
      }
    }

    fetchSubscriberCount()
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    try {
      await fetch('https://majestic-escarpment-fc69.codehooks.io/increase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '8eeea164-9ec1-4b65-b5ac-f28c1ac9b9de'
        }
      })

      setSubscriberCount((prevCount) => prevCount + 1)

      toast({
        title: 'Subscribed!',
        description: 'Thanks for joining our adventure!',
        duration: 3000
      })
      setEmail('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleClearAll = async () => {
    try {
      await fetch('https://majestic-escarpment-fc69.codehooks.io/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '8eeea164-9ec1-4b65-b5ac-f28c1ac9b9de'
        },
        body: JSON.stringify({ key: 'value' })
      })

      setSubscriberCount(0)

      toast({
        title: 'All Subscriptions Cleared',
        description: 'All subscriber data has been reset.',
        variant: 'destructive',
        duration: 3000
      })
    } catch (error) {
      console.error('Failed to reset subscriber count:', error)

      toast({
        title: 'Error',
        description: 'Failed to clear subscriptions. Please try again.',
        variant: 'destructive',
        duration: 3000
      })
    }
  }

  return (
    <div className="app-container">
      <div className="subscription-container absolute top-0 left-0 w-full z-20 p-4">
        <Card className="mx-auto max-w-md bg-background/70 backdrop-blur-sm border border-background/20 shadow-lg">
          <form onSubmit={handleSubscribe} className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Fly With Us
            </h2>
            <p className="text-center text-sm text-gray-500 mb-4">
              {subscriberCount} people have already subscribed!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </div>
          </form>

          {/* Clear All Subscriptions Button */}
          <div className="p-4 text-center">
            <Button
              variant="destructive"
              onClick={handleClearAll}
              className="w-full"
            >
              Clear All Subscriptions
            </Button>
          </div>
        </Card>
      </div>

      <div className="three-js-container">
        <ThreeScene />
      </div>

      {showOverlay && (
        <div className="overlay flex items-start justify-end md:items-center md:justify-center p-8">
          <div className="overlay-content">
            <div className="title">Experience</div>
            <h1 className="heading">Nature in Motion</h1>
            <p className="description">
              A serene visualization of a tree with flying fish swimming through
              the air. Click and drag to rotate the view. Scroll to zoom in and
              out.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Index
