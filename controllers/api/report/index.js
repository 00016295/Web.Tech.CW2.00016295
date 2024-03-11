// import specific service class
const report_service = require('../../../services/report')

// mention the service's needed actions (methods)
const report_controller = {
    getAll(req, res) {
        res.json(report_service.getAll())
    },
    create(req, res) {
        res.status(201).json(
            report_service.create(req, res)
        )
    }
}

module.exports = report_controller
