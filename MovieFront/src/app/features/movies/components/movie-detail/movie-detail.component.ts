import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgForOf } from '@angular/common';
import { ActorService } from '../../../actors/service/actor.service';
import { TruncatePipe } from "../../../../core/pipes/truncate/truncate.pipe";


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    TruncatePipe
],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit{
  
  id! : number;
  movie! : any;

  constructor(
    private movieService : MovieService,
    private actorService : ActorService,
    private activateRoute : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    if(this.activateRoute.snapshot.params['id']) {
      this.id = this.activateRoute.snapshot.params['id'];
      this.movieService.getMovieById(this.id)
      .subscribe(response => this.movie = response);
    }
  }

  getPoster(id : number) {
    return this.movieService.getPoster(id);
  }

  getProfile(id : number) {
    return this.actorService.findImage(id);
  }

  gotToDetail(id : number) {
    this.router.navigate(['actor',id]);
  }

}
