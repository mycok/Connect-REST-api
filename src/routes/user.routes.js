import { Router } from 'express';

import UserController from '../controllers/user.controller';
import { userModelSanitizer, authenticate, authorize } from '../middleware';

const router = Router();

const {
  create, list, read,
  update, remove, fetchUserByID,
  checkDuplicatesOnUpdate,
  passwordReset,
} = UserController;

router.param('userId', fetchUserByID);

router.route('/connect/v1/users')
  .post(userModelSanitizer, create)
  .get(authenticate, list);

router.route('/connect/v1/users/:userId')
  .get(authenticate, read)
  .put(authenticate, authorize, checkDuplicatesOnUpdate, update)
  .delete(authenticate, authorize, remove);

router.route('/connect/v1/users/:userId/passwordReset')
  .post(authenticate, authorize, passwordReset);

export default router;
