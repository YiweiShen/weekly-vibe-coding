'use client'

import { Plane, MapPin, Utensils, Hotel, Sun, Info } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

const messages = {
  en: () => import('../messages/en.json').then((module) => module.default),
  zh: () => import('../messages/zh.json').then((module) => module.default)
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('attractions')
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState<any>(null)
  // The buildTime will auto-update on code pushes through an environment variable.
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || 'beta'

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'zh' : 'en'
    const newTranslations = await messages[newLang as keyof typeof messages]()
    setTranslations(newTranslations)
    setLanguage(newLang)
  }

  useEffect(() => {
    messages.en().then(setTranslations)
  }, [])

  if (!translations) return null

  return (
    <main className="relative min-h-screen bg-[#faf9f6]">
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={toggleLanguage} variant="outline">
          {language === 'en' ? '中文' : 'English'}
        </Button>
      </div>

      {/* Hero Section */}
      <div
        className="h-[40vh] md:h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2 md:mb-4">
              {translations.hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90">
              {translations.hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Tabs defaultValue="attractions" className="space-y-6 md:space-y-8">
          <TabsList className="flex overflow-x-auto gap-2 px-2 md:px-0 md:grid md:grid-cols-6 md:gap-4">
            <TabsTrigger
              value="attractions"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MapPin className="h-4 w-4" />
              {translations.nav.attractions}
            </TabsTrigger>
            <TabsTrigger
              value="food"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Utensils className="h-4 w-4" />
              {translations.nav.food}
            </TabsTrigger>
            <TabsTrigger
              value="accommodation"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Hotel className="h-4 w-4" />
              {translations.nav.accommodation}
            </TabsTrigger>
            <TabsTrigger
              value="weather"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Sun className="h-4 w-4" />
              {translations.nav.weather}
            </TabsTrigger>
            <TabsTrigger
              value="transport"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Plane className="h-4 w-4" />
              {translations.nav.transport}
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Info className="h-4 w-4" />
              {translations.nav.tips}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attractions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {translations.attractions.colosseum.title}
                  </CardTitle>
                  <CardDescription>
                    {translations.attractions.colosseum.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1552432552-06c0b0a94dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="Colosseum"
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p>{translations.attractions.colosseum.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {translations.attractions.vatican.title}
                  </CardTitle>
                  <CardDescription>
                    {translations.attractions.vatican.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="Vatican Museums"
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p>{translations.attractions.vatican.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translations.attractions.trevi.title}</CardTitle>
                  <CardDescription>
                    {translations.attractions.trevi.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="Trevi Fountain"
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p>{translations.attractions.trevi.description}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="food">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.food.local.title}</CardTitle>
                  <CardDescription>
                    {translations.food.local.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {translations.food.local.items.map(
                      (item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translations.food.tips.title}</CardTitle>
                  <CardDescription>
                    {translations.food.tips.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {translations.food.tips.items.map(
                      (item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accommodation">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {translations.accommodation.areas.centro.title}
                  </CardTitle>
                  <CardDescription>
                    {translations.accommodation.areas.centro.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{translations.accommodation.areas.centro.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {translations.accommodation.areas.trastevere.title}
                  </CardTitle>
                  <CardDescription>
                    {translations.accommodation.areas.trastevere.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {translations.accommodation.areas.trastevere.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {translations.accommodation.areas.monti.title}
                  </CardTitle>
                  <CardDescription>
                    {translations.accommodation.areas.monti.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{translations.accommodation.areas.monti.description}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weather">
            <Card>
              <CardHeader>
                <CardTitle>{translations.weather.title}</CardTitle>
                <CardDescription>
                  {translations.weather.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      {translations.weather.seasons.spring.title}
                    </h3>
                    <p>{translations.weather.seasons.spring.description}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      {translations.weather.seasons.summer.title}
                    </h3>
                    <p>{translations.weather.seasons.summer.description}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      {translations.weather.seasons.fall.title}
                    </h3>
                    <p>{translations.weather.seasons.fall.description}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      {translations.weather.seasons.winter.title}
                    </h3>
                    <p>{translations.weather.seasons.winter.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {translations.transport.getting_around.title}
                  </CardTitle>
                  <CardDescription>
                    {translations.transport.getting_around.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {translations.transport.getting_around.items.map(
                      (item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translations.transport.airport.title}</CardTitle>
                  <CardDescription>
                    {translations.transport.airport.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {translations.transport.airport.items.map(
                      (item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.tips.cultural.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {translations.tips.cultural.items.map(
                      (item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translations.tips.safety.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {translations.tips.safety.items.map(
                      (item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translations.tips.money.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {translations.tips.money.items.map(
                      (item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="absolute bottom-4 right-4 text-gray-500 text-xs z-10">
        {buildTime}
      </div>
    </main>
  )
}
