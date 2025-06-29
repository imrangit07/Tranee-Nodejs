const express = require('express');
const adminController = require('../controllers/adminControllers');
const router = express.Router();


router.get('/home', adminController.home);
router.get('/createuser', adminController.createUser);
router.post('/saveuser', adminController.saveUser);

router.get('/add', adminController.addPage);
router.post('/addtask', adminController.addUserTask);


module.exports = router;