import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../service/actor.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Actor } from '../../models/Actor';
import { DatePipe, NgForOf } from '@angular/common';
import { MovieService } from '../../../movies/service/movie.service';
import { TruncatePipe } from "../../../../core/pipes/truncate/truncate.pipe";

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    TruncatePipe,
],
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.css'
})
export class ActorDetailComponent implements OnInit{
  
  id! : number;
  actor! : Actor;
  movies! : any[];

  constructor(
    private actorService : ActorService,
    private movieService : MovieService,
    private routerActive : ActivatedRoute,
    private router : Router
  ) {}

  
  ngOnInit(): void {
    if(this.routerActive.snapshot.params['id']) {
      this.id = this.routerActive.snapshot.params['id'];
      this.actorService.findById(this.id).subscribe(
        response => this.actor = response
      );
      this.movieService.getMovieByActorId(this.id).subscribe(
        response => this.movies = response
      );
    }
  }


  findImage(id : number) {
    return this.actorService.findImage(id);
  }

  findPoster(id : number) {
    return this.movieService.getPoster(id);
  }

  delete(id : number) {
    if(confirm("Do you really want to delete this actor ?")) {
      this.actorService.deleteById(id).subscribe(
        response => this.router.navigate([''])
      );
    }
  }

  goToDetail(id : number) {
    this.router.navigate(['movie',id]);
  }
}
