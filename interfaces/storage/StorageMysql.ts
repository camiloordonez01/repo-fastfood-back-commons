import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import DataBaseMysql from '../../infrastructure/database/mysql'
import { Storage } from './types'

class StorageMysql implements Storage {
    protected database: DataBaseMysql
    protected repository: Repository<ObjectLiteral>
    constructor(entity: EntityTarget<ObjectLiteral>) {
        this.database = DataBaseMysql.createConnection()
        this.repository = this.database.getRepository(entity)
    }

    async save(entity: unknown) {
        const result = await this.repository.save(entity as ObjectLiteral)

        return result
    }

    async update(id: number, entity: unknown) {
        const result = await this.repository.update(id, entity as ObjectLiteral)

        return result
    }
}

export default StorageMysql
