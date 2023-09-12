import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoadingService } from './shared/loading/loading.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SideNavService } from './shared/sidenav/sidenav.service';
import { SideNavFacade } from './shared/sidenav/sidenav.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NgStyle, MatSidenavModule, AsyncPipe, NgIf, NavbarComponent, SidebarComponent, LoadingComponent]
})
export class AppComponent {
  title = 'Food App';
  mode: MatDrawerMode = 'side';
  ms = inject(SideNavFacade);
  // ms2 = inject(SideNavFacade)
  ls = inject(LoadingService);
  changeDetector = inject(ChangeDetectorRef);
  isLoading = this.ls.getLoading();

  constructor() {
    this.ms.getSideNavPosition().subscribe((currentMode) => { this.mode = currentMode });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  getWorbenchStyle() {
    let result = {};
    this.ms.getSideNavVisible().subscribe((visible) => {
      result = visible
        ? {
          'padding-left': '10px',
        }
        : {};
    });
    return result;
  }
}
