import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isClosed ! : boolean;

}
