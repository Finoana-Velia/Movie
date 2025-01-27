import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    NgClass,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  isClosed ! : boolean;

  ngOnInit(): void {
    this.isClosed = false;
  }

  closeSidebar() {
    this.isClosed = !this.isClosed;
  }
}
