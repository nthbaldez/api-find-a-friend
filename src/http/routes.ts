import { Router } from 'express'
import { OrgController } from './controllers/org-controller'
import { authMiddleware } from './middlewares/auth-middleware'
import { PetsController } from './controllers/pets-controller'

export const routes = Router()

routes.post('/orgs', (req, res) => {
  OrgController.create(req, res)
})

routes.post('/sessions', (req, res) => {
  OrgController.authenticate(req, res)
})

routes.post(
  '/pets',
  (req, res, next) => {
    authMiddleware(req, res, next)
  },
  (req, res) => {
    PetsController.createPet(req, res)
  },
)
