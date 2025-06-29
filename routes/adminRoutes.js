const express = require('express');
const adminController = require('../controllers/adminControllers');
const router = express.Router();


router.get('/home', adminController.home);
router.get('/createuser', adminController.createUser);
router.post('/saveuser', adminController.saveUser);

router.get('/add', adminController.addPage);
router.post('/addtask', adminController.addUserTask);
router.get('/tasks', adminController.tasksPage);
router.post('/gettask', adminController.gettaskByUserId);

router.get("/downloadExcel", adminController.exportUserTask);

module.exports = router;