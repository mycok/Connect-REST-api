import { Router } from 'express';

import AuthController from '../controllers/auth.controller';

const router = Router();
const { signin, signout } = AuthController;

router.route('/connect/v1/signin').post(signin);

router.route('/connect/v1/signout').get(signout);

export default router;
