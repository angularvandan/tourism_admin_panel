import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';

export const guardGuard: CanActivateFn = (route, state) => {
  // Inject ApiService and Router
  const apiService = inject(ApiService);
  const router = inject(Router);

  let token = apiService.currentUser.token;

  if (token) {

    return apiService.getUsers().pipe(
      map((res: any) => {
        // If users are retrieved successfully, allow access
        return true;
      }),
      catchError((err: any) => {
        // On error, log out the user and prevent access
        apiService.logOut();
        return of(false); // Deny access by returning false
      })
    );

  }
  else {
    console.log(token)
    apiService.logOut();
    return false;
  }
};
