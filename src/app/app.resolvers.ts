import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { forkJoin } from 'rxjs';
import { ServicesService } from './shared/services/services.service';

export const initialDataResolver = () => {
    const navigationService = inject(NavigationService);
    const serivcesService = inject(ServicesService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService.get(),
        serivcesService.getAllServices(),
    ]);
};
