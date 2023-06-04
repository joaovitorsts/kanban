import { Status } from "./status";

export class Board{
    constructor(public name: string, public columns?: Status[]){}
}