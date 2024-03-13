const { body, param } = require('express-validator');
const report_service = require('../../services/report')

const addReportValidation = () => {
  return [
    body('Event')
      .notEmpty().withMessage('Event name must not be empty')
      .isLength({ min: 1, max: 50 }).withMessage('maximum number of elements is 50'),
    body('Date')
      .notEmpty().withMessage('Event date time must not be empty')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
        .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
    body('details')
    .isLength({ min: 0, max: 100 }).withMessage('maximum number of elements is 100'),    
  ];
};

const deletereportValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await report_service.getById(id);
      if (!exists) {
        throw new Error('report not found');
      }
    })
  ];
};

const updatereportValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await report_service.getById(id);
      if (!exists) {
        throw new Error('report not found');
      }
    }),
    body('Event')
      .notEmpty().withMessage('Event name must not be empty')
      .isLength({ min: 1, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
    body('Date')
      .notEmpty().withMessage('Event date time must not be empty')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
        .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
    body('details')
    .isLength({ min: 0, max: 100 }).withMessage('maximum number of elements is 100'), 
  ];
};

module.exports = {
    addReportValidation,
    updatereportValidation,
    deletereportValidation
};
