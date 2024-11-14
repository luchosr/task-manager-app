import { Router } from 'express';
import { body } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();
router.post(
  '/',
  body('projectName').not().isEmpty().withMessage('Project name is required'),
  body('clientName').not().isEmpty().withMessage('Client name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  handleInputErrors,
  ProjectController.createProject
);
router.get('/', ProjectController.getAllProjects);

export default router;
