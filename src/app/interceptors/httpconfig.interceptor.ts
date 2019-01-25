import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private usersService: UsersService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    const token: string = localStorage.getItem('jwt');

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.usersService.loggedUser = null;
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);
        } else if (error.status === 400 &&
                  error.error.fieldValidationErrors &&
                  error.error.fieldValidationErrors.length > 0) {
          let errorMessage = 'Si sono verificati i seguenti errori: ';
          for (let i = 0; i < error.error.fieldValidationErrors.length; i++) {
            errorMessage += '\n- ' + error.error.fieldValidationErrors[i].errorMessage;
          }
          alert(errorMessage);
        }
        // this.errorDialogService.openDialog(data);
        return throwError(error);
      })
    );

  }


}
