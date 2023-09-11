import { Component, inject } from '@angular/core';
import { NavbarService } from './navbar.service';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        NgFor,
        RouterLink,
        AsyncPipe,
    ],
})
export class NavbarComponent {
  ns = inject(NavbarService);
  items = this.ns.getTopItems();
}
