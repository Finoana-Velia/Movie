import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../service/actor.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { ActorFormComponent } from '../actor-form/actor-form.component';
import { PageResponse } from '../../../../core/models/PageResponse';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { Pagination } from '../../../../core/models/Pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ActorFormComponent,
    PaginationComponent,
    DatePipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent implements OnInit{
  
  menuOpen! : boolean;

  actorResponse! : PageResponse;

  search : string = "";

  actorUpdate! : any;

  constructor(private actorService : ActorService){}

  ngOnInit(): void {
    this.menuOpen = false;
    this.actorService.searchActor(this.search).subscribe(
      response => this.actorResponse = response
    )
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
    )
  }

  openMenu(actor : any | null){
    this.actorUpdate = actor;
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  reloadPage() {
    location.reload();
  }

  getProfile(id : number) {
    return this.actorService.findImage(id);
  }

  getDetail(id : number) {
    this.actorService.findById(id).subscribe(
      response => console.log(response)
    );
  }

  delete(id : number) {
    if(
      confirm("Do you really like to delete this actor ?")
    ) {
      this.actorService.deleteById(id).subscribe(
        response => location.reload()
      );
    }
  }

}
