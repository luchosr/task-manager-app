import { Router } from 'express';
import { body, param } from 'express-validator';
import { TaskController } from '../controllers/TaskController';
import { ProjectController } from '../controllers/ProjectController';
import { authenticate } from '../middleware/auth';
import { projectExists } from '../middleware/project';
import { handleInputErrors } from '../middleware/validation';
import { taskBelongsToProject, taskExists } from '../middleware/task';

const router = Router();
router.use(authenticate);
router.post(
  '/',
  body('projectName').not().isEmpty().withMessage('Project name is required'),
  body('clientName').not().isEmpty().withMessage('Client name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  handleInputErrors,
  ProjectController.createProject
);
router.get('/', ProjectController.getAllProjects);

router.get(
  '/:id',
  param('id').isMongoId().withMessage(' ID is not valid'),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  '/:id',
  param('id').isMongoId().withMessage(' ID is not valid'),
  body('projectName').not().isEmpty().withMessage('Project name is required'),
  body('clientName').not().isEmpty().withMessage('Client name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  '/:id',
  param('id').isMongoId().withMessage(' ID is not valid'),
  handleInputErrors,
  ProjectController.deleteProject
);

// Routes for Tasks
router.param('projectId', projectExists);

router.post(
  '/:projectId/tasks',
  body('name').not().isEmpty().withMessage('Task name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  TaskController.createTask
);

router.get('/:projectId/tasks', TaskController.getProjectTasks);

router.param('taskId', taskExists);
router.param('taskId', taskBelongsToProject);

router.get(
  '/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('Task ID is not valid'),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  '/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('Task ID is not valid'),
  body('name').not().isEmpty().withMessage('Task name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  '/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('Task ID is not valid'),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  '/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('Task ID is not valid'),
  body('status').not().isEmpty().withMessage('Status is required'),
  handleInputErrors,
  TaskController.updateTaskStatus
);

export default router;
