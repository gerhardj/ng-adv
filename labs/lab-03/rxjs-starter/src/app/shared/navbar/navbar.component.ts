import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { NavbarService } from './navbar.service';
import {MatIconModule} from '@angular/material/icon';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, RouterLink, NgFor, AsyncPipe, MatIconModule, CommonModule],
})
export class NavbarComponent {
  ns = inject(NavbarService);
  items = this.ns.getTopItems();
  ms = inject(SidenavService);
}
