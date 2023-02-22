export interface IStorage {
    save: (entity: unknown) => unknown
    update: (id: number, entity: unknown) => unknown
}
