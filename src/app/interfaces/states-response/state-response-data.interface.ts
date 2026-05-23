import { StateList } from "../../types/states-list";

export interface IStatesResponseData {
    name: string;
    iso3: string;
    states: StateList;
}