import { Router } from 'express';

import UserController from '../controllers/user.controller';
import userModelSanitizer from '../middleware/userModelSanitizer';

const router = Router();

router.param('userId', UserController.fetchUserByID);

router.route('/connect/v1/users')
  .post(userModelSanitizer, UserController.create)
  .get(UserController.list);

router.route('/connect/v1/users/:userId')
  .get(UserController.read)
  .put(UserController.checkDuplicatesOnUpdate, UserController.update)
  .delete(UserController.delete);

export default router;
