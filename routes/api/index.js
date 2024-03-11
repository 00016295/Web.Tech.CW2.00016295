const express = require('express')
const report_router = require('./report')

const router = express.Router()


router.use('/report', report_router)

module.exports = router