import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movies/service/movie.service';
import { NgForOf } from '@angular/common';
import { TruncatePipe } from "../../core/pipes/truncate/truncate.pipe";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    TruncatePipe
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  actions! : any[];
  adventure! : any[];

  constructor(
    private movieService : MovieService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.movieService.getMovieByType("Action").subscribe(
      response => this.actions = response
    );
    this.movieService.getMovieByType("Adventure").subscribe(
      response => this.adventure = response
    );
  }

  findPoster(id : number) {
    return this.movieService.getPoster(id);
  }

  goToDetail(id : number) {
    this.router.navigate(['movie',id]);
  }


  
}
