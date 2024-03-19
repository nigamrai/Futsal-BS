import express from 'express';
import { createFutsal, getFutsalDetail } from '../controllers/futsalController.js';
const futsalRouter=express.Router();
futsalRouter.post('/create',createFutsal);
futsalRouter.post('/getDetails',getFutsalDetail)
export default futsalRouter;