import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { PageResponse } from '../../../core/models/PageResponse';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url = "http://localhost:8080/api/v1/movies"

  constructor(
    private http : HttpClient,
    private errorHandler : ErrorHandlerService
  ) { }

  searchMovie(title : string,page = 0,size = 10) {
    let params = new HttpParams();
    if(title) params = params.set("title",title.toString());
    if(page) params = params.set("page", page.toString());
    if(size) params = params.set("size", size.toString());
    const option = {params};
    return this.http.get<PageResponse>(`${this.url}/search`,option)
    .pipe(
      map(response => {return response}),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  getMovieById(id : number) {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(response => {return response}),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  getMovieByActorId(id : number) {
    return this.http.get<any>(`${this.url}/actor/${id}`).pipe(
      map(response => {return response}),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  getMovieByType(type : string) {
    return this.http.get<any>(`${this.url}/type/${type}`).pipe(
      map(response => {return response}),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    )
  }

  createMovie(movie : any, file : File) {
    const formData = new FormData();
    formData.append('file',file);

    Object.keys(movie).forEach(key => {
      formData.append(key,movie[key]);
    })

    return this.http.post<any>(this.url,formData).pipe(
      map(response => console.log(response)),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  updateMovie(id : number,movie : any,file : File) {
    const formData = new FormData();
    formData.append('file',file);
    Object.keys(movie).forEach(key => {
      formData.append(key,movie[key]);
    });

    return this.http.put<any>(`${this.url}/${id}`,formData).pipe(
      map(response => console.log(response)),
      catchError(err => {
        this.errorHandler.handleError(err);
        throw new Error("Error during the request processing");
      })
    );
  }

  getPoster(id : number) {
    return this.url + "/jacket?id=" + id;
  }
  
}
