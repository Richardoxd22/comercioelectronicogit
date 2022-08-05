import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BASE_URL } from '../models/constanst';

@Injectable({
  providedIn: 'root'
})


export class LoginService {
  
  endpoint:string='';
  headers=new HttpHeaders().set('Content-Type', 'applycation/json');
  constructor(private http:HttpClient,
    @Inject(BASE_URL)endpoint:string) {
      this.endpoint=endpoint;
     }

  enviarLogin(data:any):Observable<any>{
    let apiUrl=`${this.endpoint}`;
    return this.http.post(apiUrl,data).pipe(catchError(this.error));

  }

  Registro(userName:string ="Admin",password:string="12345"):Observable<any>{
    let param = new HttpParams({
      fromObject:{
        "userName":userName,
        "password":password
      }
    });
    return this.http.post(`${this.endpoint}/api/Token`,"",{params:param});
  }
  error(error:HttpErrorResponse){
    let errorMessage ='';
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message;
    }else{
      errorMessage =`Codigo error: ${error.status} mensaje:${error.message}`;
    }
    console.log(errorMessage);
    return errorMessage;    
  }    
  // AccesLogin(data:any):Observable<any>{
  //   let apiUrl=`${this.endpoint}`
  // }
}
