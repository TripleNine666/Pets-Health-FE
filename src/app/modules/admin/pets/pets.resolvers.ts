import { inject } from '@angular/core';

import { PetsService } from './pets.service';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const PetResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const petsService = inject(PetsService);
    const router = inject(Router);
    return petsService.getPetById(route.paramMap.get('id')).pipe(
        // Error here means the requested folder is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(() => error);
        }),
    );
};
