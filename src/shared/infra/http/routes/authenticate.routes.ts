import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenControllert';
import { Router } from 'express';


const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController;
const refreshTokenController = new RefreshTokenController;

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh_token", refreshTokenController.handle);

export { authenticateRoutes }