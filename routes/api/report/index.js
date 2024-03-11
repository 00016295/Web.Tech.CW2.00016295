const express = require('express');
const { validationResult } = require('express-validator');
const { addReportValidation } = require('../../../validators/report');

const router = express.Router();
const report_controller = require('../../../controllers/api/report');

// Define API routes
router.get('/', (req, res)=>{
    report_controller.getAll(req, res);
});

router.post('/', addReportValidation(), (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    report_controller.create(req, res)
})

module.exports = router;
