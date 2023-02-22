import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { logger } from '../handler'

import Entities from '../../../infrastructure/database/models/typeorm'

const { HOST_DB, PORT_DB, USER_DB, PASSWORD_DB, SCHEMA_DB } = process.env
class DataBaseMysql {
    static instance: DataBaseMysql | null = null
    private appDataSource: DataSource
    private constructor() {
        this.appDataSource = new DataSource({
            type: 'mysql',
            host: HOST_DB,
            port: Number(PORT_DB),
            username: USER_DB,
            password: PASSWORD_DB,
            database: SCHEMA_DB,
            synchronize: false,
            logging: false,
            entities: Entities,
            subscribers: [],
            migrations: [],
        })
    }

    private async startConnection() {
        try {
            await this.appDataSource.initialize()
            console.log('Data Source has been initialized!')
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                logger.crit({
                    level: 'crit',
                    file: 'database/index.ts',
                    message: `${error.message}`,
                    stack: error.stack,
                })
            }
            return Promise.reject(error)
        }
    }

    static createConnection() {
        if (DataBaseMysql.instance === null) {
            DataBaseMysql.instance = new DataBaseMysql()
            DataBaseMysql.instance.startConnection()
        }
        return DataBaseMysql.instance
    }

    getRepository(entity: EntityTarget<ObjectLiteral>): Repository<ObjectLiteral> {
        return this.appDataSource.getRepository(entity)
    }
}

export default DataBaseMysql
