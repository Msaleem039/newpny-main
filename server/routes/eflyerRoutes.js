import express from 'express';
import { createEFlyer, getAllEFlyers, getEFlyerById } from '../controllers/eflyerController.js';


const router = express.Router();
router.route("/",).post(createEFlyer)
router.route("/",).get(getAllEFlyers)
router.route("/:id",).get(getEFlyerById)

export default router;