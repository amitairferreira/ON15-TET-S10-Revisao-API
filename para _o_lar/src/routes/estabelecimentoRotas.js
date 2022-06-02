const express = require('express');

const controller = require('../controllers/estabelecimentoController');

const router = express.Router();

router.post("/adicionar", controller.createBusiness)
router.patch("/atualizar/:id", controller.updateAddress)
router.patch("/curtir/:id", controller.addLikes)
router.patch("/descurtir/:id", controller.deslike)









module.exports = router