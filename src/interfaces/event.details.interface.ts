import { EventInterface } from "../interfaces"
import { ActionInterface } from "../interfaces"

export interface EventDetailsInterface {
    id?: number | string;
    id_events?: number | string;
    id_actions?: number | string;
    value_detail: number;
    Event?: EventInterface;
    Action?: ActionInterface;
}