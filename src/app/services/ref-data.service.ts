import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from 'ngx-ez';

import { EzCache } from 'ez-state';
import { MockHttpService } from './mock-http.service';

@Injectable({
  providedIn: 'root'
})
export class RefDataService {
  private observables: { [key: string]: Observable<Option[]> } = {};
  
  constructor(private http: MockHttpService) {}

  get titles$(): Observable<Option[]> {
    return this.observables.titles$ || this.create('titles$', this.http.get<Option[]>('titles'));
  }

  private create(property: string, source$: Observable<Option[]>) {
    const cache = new EzCache<Option[]>();
    cache.load(source$);
    return this.observables[property] = cache.value$;
  }
}
