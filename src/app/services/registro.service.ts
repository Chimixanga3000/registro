import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  //propiedades
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  //método para agregar un registro
  agregarRegistro(data):Observable<any>{
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url,data)
    .pipe(catchError(this.errorManager));
  }


  //método para obtener todos los registros
  getRegistros(){
    let url = `${this.baseUri}/registros`;
    return this.http.get(url);
  }

  //método que obtiene un registro por su id
  getRegistro(id): Observable<any> {
    let url = `${this.baseUri}/registro/${id}`;
    return this.http.get(url,{headers: this.headers}).pipe(map((res:Response)=>{
      return res || {};
    }),catchError(this.errorManager)
    );
  }

  //método para actualizar un registro
  updateRegistro(id,data):Observable<any>{
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url,data,{
      headers:this.headers
    }).pipe(catchError(this.errorManager));
  }

  //método para eliminar un registro
  deleteRegistro(id):Observable<any>{
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url,{
      headers: this.headers
    }).pipe(catchError(this.errorManager));
  }

  //manejadr de rrores
  errorManager(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //obtenemos  el error del lado del cliente
      errorMessage=error.error.message;
    } else {
      //obtenemos el error del lado del server
      errorMessage = `Error: ${error.status}
      Mensaje: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(()=>{
      return errorMessage;
    });
  }
}
