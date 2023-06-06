import { Column } from "./column"

export class Task {
    constructor(public id: number, public title: string, public column: number,
        public startDate: Date, public conclusionDate: Date, public order: number) { }
}    