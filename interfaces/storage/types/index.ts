export interface Storage {
    save: (entity: unknown) => unknown
    update: (id: number, entity: unknown) => unknown
}
