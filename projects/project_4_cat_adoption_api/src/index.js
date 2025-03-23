import express from 'express'
import catsRoutes from './routes/cats.js'
import adoptionsRoutes from './routes/adoptions.js'
import { setupSwagger } from './openapi.js'

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())

// Routes
app.use('/cats', catsRoutes)
app.use('/adoptions', adoptionsRoutes)

// Swagger Documentation
setupSwagger(app)

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Cat Adoption Center API',
    endpoints: {
      cats: '/cats',
      adoptions: '/adoptions',
      docs: '/api-docs'
    }
  })
})

// 404 Handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }))

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`📄 API Docs available at http://localhost:${PORT}/api-docs`)
})
