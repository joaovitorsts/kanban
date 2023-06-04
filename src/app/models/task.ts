import { Status } from "./status"

export class Task {
    constructor(public title: string, public status: Status,
                public startDate: Date, public conclusionDate: Date){}
}    