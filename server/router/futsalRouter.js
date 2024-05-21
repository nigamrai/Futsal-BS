import express from 'express';
import { createFutsal, getFutsalDetail } from '../controllers/futsalController.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
const futsalRouter=express.Router();
futsalRouter.post('/create',createFutsal);
futsalRouter.post('/getDetails',isLoggedIn,getFutsalDetail)
export default futsalRouter;