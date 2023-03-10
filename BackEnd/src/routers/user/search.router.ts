import express from "express";
import multer from "multer";

import searchController from "../../controllers/user/search.controller";

let upload = multer();
let router = express.Router();

router.get('/:q', searchController.search);


export default router;

