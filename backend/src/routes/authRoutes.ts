import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();
router.post(
  '/create-account',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Not valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password needs to be at least 8 characters long'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  '/confirm-account',
  body('token').notEmpty().withMessage('Token is required'),
  handleInputErrors,
  AuthController.confirmAccount
);

router.post(
  '/login',
  body('email').isEmail().withMessage('Not valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleInputErrors,
  AuthController.login
);

router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('Not valid email'),
  handleInputErrors,
  AuthController.forgotPassword
);

export default router;
