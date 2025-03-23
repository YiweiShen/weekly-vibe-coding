import express from 'express'
import { cats } from '../data/mockData.js'

const router = express.Router()

/**
 * @swagger
 * /cats:
 *   get:
 *     summary: Get all cats
 *     description: Returns a list of all cats
 *     responses:
 *       200:
 *         description: A list of cats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   breed:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   gender:
 *                     type: string
 *                   status:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/', (req, res) => {
  res.json(cats)
})

/**
 * @swagger
 * /cats/{id}:
 *   get:
 *     summary: Get a specific cat by ID
 *     description: Returns details of a specific cat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Cat ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A specific cat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 breed:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 gender:
 *                   type: string
 *                 status:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Cat not found
 */
router.get('/:id', (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id))
  if (cat) res.json(cat)
  else res.status(404).json({ error: 'Cat not found' })
})

/**
 * @swagger
 * /cats:
 *   post:
 *     summary: Add a new cat
 *     description: Add a new cat to the adoption center
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - breed
 *               - age
 *               - gender
 *     responses:
 *       201:
 *         description: Cat successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
router.post('/', (req, res) => {
  const newCat = {
    id: cats.length + 1,
    ...req.body,
    status: 'Available'
  }

  cats.push(newCat)
  res.status(201).json(newCat)
})

export default router
