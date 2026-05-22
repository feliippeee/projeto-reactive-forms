import { Component } from '@angular/core';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private readonly _countriesService: CountriesService
  ) {}

  ngOnInit() {
    return this._countriesService.getCountries().subscribe((countriesResponse: any) => {
      console.log('countriesResponse', countriesResponse);
    });
  }
}
