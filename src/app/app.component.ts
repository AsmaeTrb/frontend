import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
    standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
   imports: [
    RouterOutlet,RouterLink, CommonModule,NavbarComponent
  ]
})
export class AppComponent implements OnInit {
  showNavbar = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const hidden = ['/cart', '/checkout', '/confirmation',];
        this.showNavbar = !hidden.includes(e.urlAfterRedirects);
      });
  }
}
