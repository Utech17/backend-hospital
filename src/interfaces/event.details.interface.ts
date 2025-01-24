import { EventInterface } from "../interfaces"
import { ActionInterface } from "../interfaces"

export interface EventDetailsInterface {
    id?: number | string;
    events_id?: number | string;
    actions_id?: number | string;
    value_detail: number;
}