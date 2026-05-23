import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IStatesResponse } from "../interfaces/states-response/states-response.interface";
import { StateList } from "../types/states-list";

@Injectable({
    providedIn: "root"
})
export class StateService {
    constructor(
        private readonly _httpClient: HttpClient
    ){}

    getStates(countryName: string): Observable<StateList> {
        return this._httpClient.post<IStatesResponse>(
            'https://countriesnow.space/api/v0.1/countries/states',
            {country: countryName}
        ).pipe(
            map((stateResponse) => {
                return stateResponse.data.states;
            }),
        );
    }
}