const express = require('express')
const report_router = require('./report')

const router = express.Router()

// registering child routers
router.use('/report', report_router)

module.exports = router