const fs = require('fs')

// access global mock db file
const reports = require(global.mock_db)

// write service method implementations
const report_service = {
    getAll() {
        return reports
    },
    create(req, res) {
        let new_id = genRanId(4)
                
        const report = req.body

        const new_report = {
            id: new_id,
            report: report
        }

        reports.push(new_report)
        
        writeToFile(reports)
        
        return new_report
    }
}

// create function for overwriting the db file updated db content
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

// generate random id inspired by uuid
let genRanId = (count) =>{
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports =report_service