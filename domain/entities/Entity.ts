class Entity {
    activeRow?: string
    createdAt?: string
    updatedAt?: string

    constructor(entity: Entity) {
        this.activeRow = entity.activeRow
        this.createdAt = entity.createdAt
        this.updatedAt = entity.updatedAt
    }
}

export default Entity
