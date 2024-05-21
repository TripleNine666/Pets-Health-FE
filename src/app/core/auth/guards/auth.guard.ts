import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);

    // Проверяет статус авторизации
    return inject(AuthService).check().pipe(
        switchMap((authenticated) =>
        {
            // Если пользователь не авторизован..
            if ( !authenticated )
            {
                // Редирект на страницу sign-out
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);
                return of(urlTree);
            }
            // Открывает доступ
            return of(true);
        }),
    );
};
