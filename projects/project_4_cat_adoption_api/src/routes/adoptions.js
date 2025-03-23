import express from 'express'
import { cats, adoptions } from '../data/mockData.js'

const router = express.Router()

/**
 * @swagger
 * /adoptions:
 *   get:
 *     summary: Get all adoptions
 *     description: Returns a list of all adoptions
 *     responses:
 *       200:
 *         description: A list of adoptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   catId:
 *                     type: integer
 *                   adopterName:
 *                     type: string
 *                   adoptionDate:
 *                     type: string
 *                     format: date
 */
router.get('/', (req, res) => {
  res.json(adoptions)
})

/**
 * @swagger
 * /adoptions:
 *   post:
 *     summary: Submit an adoption request
 *     description: Submit a request to adopt a cat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catId:
 *                 type: integer
 *               adopterName:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *                 format: email
 *             required:
 *               - catId
 *               - adopterName
 *               - contactEmail
 *     responses:
 *       201:
 *         description: Adoption application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 status:
 *                   type: string
 */
router.post('/', (req, res) => {
  const { catId, adopterName, contactEmail } = req.body
  const cat = cats.find((c) => c.id === catId)

  if (!cat || cat.status !== 'Available') {
    return res.status(400).json({ error: 'Cat not available for adoption' })
  }

  const newAdoption = {
    id: adoptions.length + 1,
    catId,
    adopterName,
    contactEmail,
    adoptionDate: new Date().toISOString().split('T')[0]
  }

  cat.status = 'Pending Adoption'
  adoptions.push(newAdoption)

  res.status(201).json({
    id: newAdoption.id,
    status: 'Application Received'
  })
})

export default router
