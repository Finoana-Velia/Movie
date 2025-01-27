import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../models/Pagination';
import { PageResponse } from '../../models/PageResponse';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() pagination! : PageResponse;
  @Output() data = new EventEmitter<Pagination>();

  changePage(page : number,size : number,totalPage : number) {
    this.data.emit({
      page : page,
      size : size,
      totalPage : totalPage
    });
  }

  onSelectOption() {
    this.data.emit({
      page : 0,
      size : this.pagination.size,
      totalPage : this.pagination.totalPages,
    })
  }
}
