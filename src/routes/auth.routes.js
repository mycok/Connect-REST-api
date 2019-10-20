import { Router } from 'express';

import AuthController from '../controllers/auth.controller';

const router = Router();
const { signin, signout, activateUserAccount } = AuthController;

router.route('/connect/v1/signin').post(signin);

router.route('/connect/v1/signout').get(signout);

router.route('/connect/v1/activation/:token').get(activateUserAccount);

export default router;
