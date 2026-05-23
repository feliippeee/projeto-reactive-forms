import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICitiesResponse } from "../interfaces/cities-response/cities-response.interface";
import { CitiesList } from "../types/cities-list";

@Injectable({
    providedIn: 'root',
})

export class CitiesService{
    constructor(
        private readonly _httpClient: HttpClient
    ){}

    getCities(countryName: string, stateName: string): Observable<CitiesList> {
    return this._httpClient.post<ICitiesResponse>(
        'https://countriesnow.space/api/v0.1/countries/cities',
        { 
            country: countryName, 
            state: stateName 
        }
    ).pipe(//pipe utilizado para mudar o retorno dos dados, tirar por exemplo o error que vem da chamada que não utilizamos e utilizar somente a lista de dados
        map((citiesResponse) => {
            return citiesResponse.data;
        }),
    );
    }
}

