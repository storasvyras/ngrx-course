import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { isLoggedIn } from "./auth.selectors";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AuthGuard>, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe( 
            select(isLoggedIn),
            tap(loggeIn => {
                if (!loggeIn) {
                    this.router.navigateByUrl('/login');
                }
            })  
        )
    }
    
}