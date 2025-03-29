import { Router } from 'express'
import { OrgController } from './controllers/org-controller'

export const routes = Router()

routes.post('/orgs', OrgController.create)
