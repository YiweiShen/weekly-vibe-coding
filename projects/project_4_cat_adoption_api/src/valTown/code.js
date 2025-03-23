/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import React from 'https://esm.sh/react@18.2.0'

// Mock Database
const cats = [
  {
    id: 1,
    name: 'Whiskers',
    breed: 'Tabby',
    age: 3,
    gender: 'Female',
    status: 'Available',
    description: 'Friendly and playful tabby looking for a forever home',
    imageUrl: 'https://maxm-imggenurl.web.val.run/cute-tabby-cat'
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Siamese',
    age: 2,
    gender: 'Female',
    status: 'Available',
    description: 'Elegant Siamese with striking blue eyes',
    imageUrl: 'https://maxm-imggenurl.web.val.run/siamese-cat'
  },
  {
    id: 3,
    name: 'Simba',
    breed: 'Maine Coon',
    age: 5,
    gender: 'Male',
    status: 'Pending Adoption',
    description: 'Large, fluffy Maine Coon with a gentle personality',
    imageUrl: 'https://maxm-imggenurl.web.val.run/maine-coon-cat'
  }
]

const adoptions = []

// OpenAPI Specification
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Cat Adoption Center API',
    version: '1.0.0',
    description: 'API for managing cat adoptions and cat information'
  },
  paths: {
    '/cats': {
      get: {
        summary: 'List all cats',
        responses: {
          200: {
            description: 'List of available cats',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      name: { type: 'string' },
                      breed: { type: 'string' },
                      age: { type: 'integer' },
                      gender: { type: 'string' },
                      status: { type: 'string' },
                      description: { type: 'string' },
                      imageUrl: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Add a new cat to the adoption center',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  breed: { type: 'string' },
                  age: { type: 'integer' },
                  gender: { type: 'string' },
                  description: { type: 'string' }
                },
                required: ['name', 'breed', 'age', 'gender']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Cat successfully added',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/cats/{id}': {
      get: {
        summary: 'Get details of a specific cat',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Detailed information about a specific cat',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    breed: { type: 'string' },
                    age: { type: 'integer' },
                    gender: { type: 'string' },
                    status: { type: 'string' },
                    description: { type: 'string' },
                    imageUrl: { type: 'string' }
                  }
                }
              }
            }
          },
          404: {
            description: 'Cat not found'
          }
        }
      }
    },
    '/adoptions': {
      get: {
        summary: 'List all adoptions',
        responses: {
          200: {
            description: 'List of adoption records',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      catId: { type: 'integer' },
                      adopterName: { type: 'string' },
                      adoptionDate: { type: 'string', format: 'date' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Submit an adoption application',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  catId: { type: 'integer' },
                  adopterName: { type: 'string' },
                  contactEmail: { type: 'string', format: 'email' }
                },
                required: ['catId', 'adopterName', 'contactEmail']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Adoption application submitted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    status: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function SwaggerPage() {
  return (
    <div>
      <div id="swagger-ui"></div>
    </div>
  )
}

function client() {
  createRoot(document.getElementById('root')).render(<SwaggerPage />)

  // Dynamically load Swagger UI
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js'
  script.onload = () => {
    window.SwaggerUIBundle({
      spec: JSON.parse(JSON.stringify(openApiSpec)),
      dom_id: '#swagger-ui',
      presets: [
        window.SwaggerUIBundle.presets.apis,
        window.SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      layout: 'BaseLayout'
    })
  }
  document.head.appendChild(script)

  // Load Swagger UI CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css'
  document.head.appendChild(link)
}

if (typeof document !== 'undefined') {
  client()
}

export default async function server(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const method = request.method

  // Routing
  if (url.pathname === '/cats') {
    if (method === 'GET') {
      return Response.json(cats)
    } else if (method === 'POST') {
      try {
        const newCat = await request.json()
        const id = cats.length + 1
        const catToAdd = {
          id,
          ...newCat,
          status: 'Available',
          imageUrl: `https://maxm-imggenurl.web.val.run/${newCat.breed
            .toLowerCase()
            .replace(' ', '-')}-cat`
        }
        cats.push(catToAdd)
        return Response.json({ id }, { status: 201 })
      } catch (error) {
        return new Response('Invalid cat data', { status: 400 })
      }
    }
  }

  if (url.pathname.startsWith('/cats/')) {
    const catId = parseInt(url.pathname.split('/')[2])
    const cat = cats.find((c) => c.id === catId)

    if (cat) {
      return Response.json(cat)
    } else {
      return new Response('Cat not found', { status: 404 })
    }
  }

  if (url.pathname === '/adoptions') {
    if (method === 'GET') {
      return Response.json(adoptions)
    } else if (method === 'POST') {
      try {
        const adoptionRequest = await request.json()
        const cat = cats.find((c) => c.id === adoptionRequest.catId)

        if (!cat || cat.status !== 'Available') {
          return new Response('Cat not available for adoption', { status: 400 })
        }

        const id = adoptions.length + 1
        const adoption = {
          id,
          ...adoptionRequest,
          adoptionDate: new Date().toISOString().split('T')[0]
        }

        adoptions.push(adoption)
        cat.status = 'Pending Adoption'

        return Response.json(
          {
            id,
            status: 'Application Received'
          },
          { status: 201 }
        )
      } catch (error) {
        return new Response('Invalid adoption data', { status: 400 })
      }
    }
  }

  switch (url.pathname) {
    case '/':
      return Response.json({
        message: 'Welcome to Cat Adoption Center API',
        availableCats: cats.filter((c) => c.status === 'Available').length
      })

    case '/docs':
      return new Response(
        `
        <html>
          <head>
            <title>Cat Adoption Center API Documentation</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            <div id="root"></div>
            <script src="https://esm.town/v/std/catch"></script>
            <script type="module" src="${import.meta.url}"></script>
          </body>
        </html>
      `,
        {
          headers: { 'content-type': 'text/html' }
        }
      )

    default:
      return new Response('Not Found', { status: 404 })
  }
}

const css = `
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
`
