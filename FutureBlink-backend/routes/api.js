const express = require('express');
const { apiSchedule, saveFlow } = require('../controllers/apiControllers');
const router = express.Router();
const authenticateApiKey = require('../middlewares/apiKeyMiddleware')


router.post('/schedule-email', authenticateApiKey, apiSchedule);
router.post('/save-flow', authenticateApiKey, saveFlow);


module.exports = router;