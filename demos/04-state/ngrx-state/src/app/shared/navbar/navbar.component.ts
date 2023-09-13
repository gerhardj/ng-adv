import { Component, inject } from '@angular/core';
import { SideNavFacade } from 'src/app/state/sidenav.facade';
import { SnackbarService } from '../snackbar/snackbar.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  nav = inject(SideNavFacade);
  ms = inject(NavbarService);
  sns = inject(SnackbarService);
  menuItems = this.ms.getTopItems();

  toggleMenu() {
    this.nav.toggleMenuVisibility();
  }

  toggleApps() {
    this.sns.displayAlert('Apps', 'Not implemented - just a mock');
  }
}
