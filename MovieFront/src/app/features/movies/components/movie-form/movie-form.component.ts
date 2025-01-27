import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { PaginationComponent } from "../../../../core/components/pagination/pagination.component";
import { PageResponse } from '../../../../core/models/PageResponse';
import { ActorService } from '../../../actors/service/actor.service';
import { Pagination } from '../../../../core/models/Pagination';
import { Location, NgForOf, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    PaginationComponent,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {

  actorResponse! : PageResponse;
  search : string = "";

  id! : number;

  @ViewChild('jacket') jacket! : ElementRef;
  @ViewChild('submitter') submitter! : ElementRef;

  url! : string | ArrayBuffer| null;
  movie_form = new FormGroup({
    jacket : new FormControl(),
    title : new FormControl("", {
      nonNullable : true,
      validators : Validators.required
    }),
    type : new FormControl("Unknow", {
      nonNullable : true,
      validators : Validators.required
    }),
    duration : new FormControl(null,{
      nonNullable : true,
      validators : Validators.required
    }),
    release : new FormControl(),
    description : new FormControl("")
  });

  actorList ! : any[];

  constructor(
    private movieService : MovieService,
    private actorService : ActorService,
    private location : Location,
    private route : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.actorList = [];
    this.actorService.searchActor(this.search).subscribe(
      response => this.actorResponse = response
    );
    if(this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.movieService.getMovieById(this.id).subscribe(
        response => {
          this.movie_form = new FormGroup({
            jacket : new FormControl(),
            title : new FormControl(response.title, {
              nonNullable : true,
              validators : Validators.required
            }),
            type : new FormControl(response.type, {
              nonNullable : true,
              validators : Validators.required
            }),
            duration : new FormControl(response.duration,{
              nonNullable : true,
              validators : Validators.required
            }),
            release : new FormControl(response.release),
            description : new FormControl(response.description)
          });
          this.url = this.movieService.getPoster(response.id);
          response.actors.forEach((actor : any) => {
            this.actorList.push(actor);
          });
        }
      );
    }

  }

  searchItem(page = 0,size = 10) {
    this.actorService.searchActor(this.search,page,size).subscribe(
      response => this.actorResponse = response
    );
  }

  getDataFromPagination(event : Pagination) {
    this.actorService.searchActor(this.search,event.page,event.size)
    .subscribe(
      response => this.actorResponse = response
    );
  }

  getProfile(id : number) {
    return this.actorService.findImage(id);
  }

  
  activateInputFile() {
    this.jacket.nativeElement.click();
  }

  onSelectFile(event : any) {
    if(event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
        this.movie_form.controls.jacket.setValue(event.target.files[0]);
      }
    }
  }

  addActor(actor : any) {
    this.actorList.push(actor);
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.submitter.nativeElement.click();
  }

  remove(id : number) {
    let index = this.actorList.findIndex(
      (item : any) => item.id == id
    );
    this.actorList.splice(index,1);
  }

  postMethod() {
    if(this.id) {
      this.movieService.updateMovie(
        this.id,
        this.generateMovieValue(),
        this.jacketFile
      ).subscribe(
        response => this.router.navigate(['movies']),
        error => alert("update error")
      )
    }else {
      this.movieService.createMovie(
        this.generateMovieValue(),
        this.jacketFile
      ).subscribe(
        response => this.router.navigate(['movies']),
        error => alert("Error")
      );
    }
    
  }

  extractIdActor() {
    let ids: any[] = [];
    this.actorList.forEach((actor : any) => {
      ids.push(actor.id);
    });
    return ids;
  }

  generateMovieValue() : Partial<Movie> {
    return {
      title : this.title,
      release : this.release,
      duration : this.duration,
      type : this.type,
      description : this.description,
      actors : this.extractIdActor()
    }
  }

  get title() {
    return this.movie_form.controls.title.value;
  }

  get release() {
    return this.movie_form.controls.release.value;
  }

  get duration() {
    return this.movie_form.controls.duration.value;
  }

  get type() {
    return this.movie_form.controls.type.value;
  }

  get description() {
    return this.movie_form.controls.description.value;
  }

  get jacketFile() {
    return this.movie_form.controls.jacket.value
  }
  
}
