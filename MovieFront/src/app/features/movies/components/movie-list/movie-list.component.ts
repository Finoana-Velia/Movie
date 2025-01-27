import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from "../../../../core/components/pagination/pagination.component";
import { Router, RouterLink } from '@angular/router';
import { PageResponse } from '../../../../core/models/PageResponse';
import { MovieService } from '../../service/movie.service';
import { NgForOf } from '@angular/common';
import { Pagination } from '../../../../core/models/Pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    PaginationComponent,
    RouterLink,
    NgForOf,
    FormsModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{

  movieResponse! : PageResponse;
  searchTitle : string = "";

  constructor(
    private movieService : MovieService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.movieService.searchMovie(this.searchTitle).subscribe(
      response => this.movieResponse = response
    );
  }

  getPoster(id : number) {
    return this.movieService.getPoster(id);
  }

  searchMovies(page : number,size : number) {
    this.movieService.searchMovie(this.searchTitle,page,size)
    .subscribe(response => this.movieResponse = response);
  }

  getDataFromPagination(event : Pagination) {
    this.movieService.searchMovie(
      this.searchTitle,
      event.page,
      event.size
    ).subscribe(response => this.movieResponse = response)
  }

  add() {
    this.router.navigate(["movies/form"]);
  }

}
