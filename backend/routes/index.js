const express = require('express')
const router = express.Router()
const api_router = require('./api/api.js');

router.use('/api', api_router);

module.exports = router;