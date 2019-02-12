import { Injectable } from '@angular/core';
import { Route, PreloadingStrategy } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectiveStrategy implements PreloadingStrategy {

    // control which modules get preloaded
    preload(route: Route, load: Function): Observable<any> {
        if(route.data && route.data['preload']) {
            return load();
        }
        return of(null);
    }
}
