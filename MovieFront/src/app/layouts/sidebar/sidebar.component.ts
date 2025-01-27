import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() isClosed ! : boolean;

  

}
