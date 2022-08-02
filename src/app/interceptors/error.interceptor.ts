import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if(error){
          if(error.status===400){
            console.log(`Error 400 bad request`, error);
            throw error.error;            
          }
          
          if(error){
            if(error.status===401){
              console.log(`Error 401 Unauthorized`, error);
              throw error.error;            
            }
          }

          if(error){
            if(error.status===404){
              console.log(`Error 404 Not Found`, error);
              //redireccionar a pagina errro
              this.router.navigateByUrl('not found')  
            }
          }

          if(error){
            if(error.status===500){
              console.log(`Error 500 Internal Server Error`, error);
              //redireccionar a pagina errro
              //this.router.navigateByurl('not found')  
            }
          }
        }
        
        return throwError(error);
      })
    );
  }
}
