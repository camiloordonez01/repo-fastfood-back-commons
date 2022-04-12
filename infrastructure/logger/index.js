const { createLogger, format, transports } = require('winston')
const moment = require('moment-timezone')

const MESSAGE = Symbol.for('message')

const { SERVICE_LOG, TIMEZONE } = process.env

const jsonFormatter = (logEntry) => {
    const entry = logEntry

    entry[MESSAGE] = JSON.stringify({
        service: SERVICE_LOG,
        timestamp: moment(new Date().getTime())
            .tz(TIMEZONE)
            .format('YYYY-MM-DD HH:mm:ss.SSS')
            .toString(),
        ...logEntry,
    })

    return entry
}

const myLevels = {
    levels: {
        audit: 0,
        crit: 1,
        error: 2,
        warning: 3,
        info: 4,
        debug: 5,
    },
    colors: {
        info: 'green',
        error: 'red',
    },
}

const Logger = createLogger({
    levels: myLevels.levels,
    format: format(jsonFormatter)(),
    transports: [new transports.Console()],
})

module.exports = { Logger }
