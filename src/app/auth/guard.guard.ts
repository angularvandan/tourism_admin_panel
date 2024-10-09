import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  // Inject ApiService and Router
  const apiService = inject(ApiService);
  const router = inject(Router);

  let token=apiService.currentUser.token;
    if(token){
      return true;
    }
    else {
      console.log(token)
      apiService.logOut();
      return false;
    }
};
