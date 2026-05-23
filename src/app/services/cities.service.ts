import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class CitiesService{
    constructor(
        private readonly _httpClient: HttpClient
    ){}

    getCities(countryName: string, stateName: string) {
    return this._httpClient.post<any>(
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

