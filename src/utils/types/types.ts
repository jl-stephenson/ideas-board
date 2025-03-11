export interface Idea {
    id: number,
    title: string,
    content: string,
    createdTimestamp: number,
    updatedTimestamp?: number,
    isNew: boolean
}