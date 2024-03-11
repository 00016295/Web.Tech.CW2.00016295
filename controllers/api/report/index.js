
const report_service = require('../../../services/report')

const report_controller = {
    getAll(req, res) {
        res.json(report_service.getAll())
    },
    create(req, res) {
        res.status(201).json(
            report_service.create(req, res)
        )
    },
    update(req, res) {
        const report = report_service.update(req.params.id, req.body)
        
        if (report) {
            res.json(report)
        } else {
            res.status(404).send('report not found')
        }
    },
    delete(req, res) {
        const report = report_service.getById(req.params.id)
        
        if (report) {
            report_service.delete(req.params.id)
            res.status(204).send('report deleted successfully')
        } else {
            res.status(404).send('report not found')
        }
    }
}

module.exports = report_controller
