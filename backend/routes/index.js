const express = require('express')
const router = express.Router()
const api_router = require('./api/api.js');

router.use('/api', api_router);
// router.get("/", function(req, res) {
//     console.log("hello")
//     res.send("he")
// })

module.exports = router;