const fs = require('fs')


const reports = require(global.mock_db)


const report_service = {
    getAll() {
        return reports
    },
    getById(id) {
        return reports.find(t => t.id == id)
    },    
    create(req, res) {
        let new_id = genRandId(4)
                
        const report = req.body

        const new_report = {
            id: new_id,
            report: report
        }

        reports.push(new_report)
        
        writeToFile(reports)
        
        return new_report
    },
    update(id, updateData){
        const reportIndex = reports.findIndex(t => t.id == id)

        if (reportIndex === -1) {
            return null
        }

        reports[reportIndex].report = { ...reports[reportIndex].report, ...updateData }

        writeToFile(reports)

        return reports[reportIndex]
    },
    delete(id) {
        const index = reports.findIndex(u => u.id == id)
        reports.splice(index, 1)    
        writeToFile(reports)
    }
}


let writeToFile = async (users) => {
    await 
        fs.writeFileSync(
            global.mock_db,
            JSON.stringify(
                users, null, 4
            ),
            'utf8'
        )
}

let genRandId = (count) =>{
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = report_service
