type level = 'audit' | 'crit' | 'error' | 'warning' | 'info' | 'debug'

export interface ILoggerObject {
    level: level
    file: string
    message: string
    stack?: string | undefined
}
