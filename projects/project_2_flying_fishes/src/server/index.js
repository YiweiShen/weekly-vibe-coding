import { app, Datastore } from 'codehooks-js'

// Variable to track the number of emails
let emailCount = 0

// Route to increase email count
app.post('/increase', async (req, res) => {
  const db = await Datastore.open()
  emailCount = await db.incr('emailCount', 1)
  res.json({ message: 'Email count increased', total_emails: emailCount })
})

// Route to get the current email count
app.get('/count', async (req, res) => {
  const db = await Datastore.open()
  const totalEmails = (await db.get('emailCount')) || 0
  res.json({ total_emails: totalEmails })
})

// Route to reset email count
app.post('/reset', async (req, res) => {
  const db = await Datastore.open()
  await db.set('emailCount', 0)
  res.json({ message: 'Email count reset', total_emails: 0 })
})

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

// Bind to serverless runtime
export default app.init()
