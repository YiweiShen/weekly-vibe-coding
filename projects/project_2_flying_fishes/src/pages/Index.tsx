import { useState, useEffect } from 'react'
import ThreeScene from '../components/ThreeScene'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

const Index = () => {
  const [showOverlay, setShowOverlay] = useState(true)
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      })
      return
    }

    toast({
      title: 'Subscribed!',
      description: 'Thanks for joining our adventure!'
    })
    setEmail('')
  }

  return (
    <div className="app-container">
      <div className="subscription-container absolute top-0 left-0 w-full z-20 p-4">
        <Card className="mx-auto max-w-md bg-background/70 backdrop-blur-sm border border-background/20 shadow-lg">
          <form onSubmit={handleSubscribe} className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Fly With Us
            </h2>
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
