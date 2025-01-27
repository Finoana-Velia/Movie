import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { PageResponse } from '../../../core/models/PageResponse';
import { Actor } from '../models/Actor';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private url = "http://localhost:8080/api/v1/actor";

  constructor(
    private http : HttpClient,
    private errorHandler : ErrorHandlerService
  ) { }

  searchActor(name : string, page : number = 0, size : number = 10) {
    return this.http.get<PageResponse>(`${this.url}/search?name=${name}&page=${page}&size=${size}`).pipe(
      map(response => {return response}),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  addActor(actor : any, file : File) {
    const formData = new FormData();
    formData.append('file',file);
    formData.append("actorData", JSON.stringify(actor));
    return this.http.post<any>(this.url,formData).pipe(
      map(response => console.log(response)),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  updateActor(id : number,actor : any,file : File) {
    const formData = new FormData();
    formData.append('file',file);
    formData.append("actor", JSON.stringify(actor));
    return this.http.put<any>(`${this.url}/${id}`,formData).pipe(
      map(response => console.log(response)),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  findById(id : number) {
    return this.http.get<Actor>(`${this.url}/${id}`).pipe(
      map(response => response),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  findImage(id : number) {
    return this.url + "/getImage?id=" + id;
  }

  deleteById(id : number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map(response => console.log(response)),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

}
