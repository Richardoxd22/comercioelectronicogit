import { Injectable,Inject } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, from, Observable } from 'rxjs';
import { BASE_URL } from '../models/constanst';
import { GlobalParams } from '../models/globalParams';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  endpoint:string='';
  headers= new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http:HttpClient,
    @Inject(BASE_URL) endpoint:string) {
    this.endpoint=endpoint;
   }

  getCarts(globalParams:GlobalParams):Observable<any>{


    let apiUrl=`${this.endpoint}/api/Cart`;
    let params= new HttpParams();

    if(globalParams.search){
      params=params.append('search',globalParams.search);
    }

    if(globalParams.sort){
      params=params.append('sort',globalParams.sort);
    }

    if(globalParams.sortOrder){
      params=params.append('order',globalParams.sortOrder);
    }

    if(globalParams.pageSize){
      params=params.append('limit',globalParams.pageSize);
    }

    if(globalParams.pageNumber){
      params=params.append('offset',globalParams.pageNumber);
    }

    return this.http.get(apiUrl,{params:params});    


  }

  getCartsById(id:string):Observable<any>{
    let apiUrl=`${this.endpoint}/api/Cart/${id}`;
    console.log(apiUrl);    
    return this.http.get(apiUrl);
  }
  
  createCart(data:any):Observable<any>{
    let apiUrl=`${this.endpoint}/api/Cart`;
    console.log(apiUrl);    
    return this.http.post(apiUrl,data).pipe(catchError(this.error));
  }
  updateCart(data:any):Observable<any>{
    let apiUrl=`${this.endpoint}/api/Cart`;
    return this.http.put(apiUrl,data).pipe(catchError(this.error));
  }

  deleteCart(id:number):Observable<any>{
    let apiUrl=`${this.endpoint}/api/Cart${id}`;
    return this.http.delete(apiUrl).pipe(catchError(this.error));
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
}
