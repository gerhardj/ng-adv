import { Component, DestroyRef, OnInit, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SidebarActions } from 'src/app/shared/side-panel/sidebar.actions';
import { SidePanelService } from 'src/app/shared/side-panel/sidepanel.service';
import { SideNavFacade } from 'src/app/state/sidenav.facade';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../shared/loading/loading.service';
import { DemoFacade } from '../state/demo.facade';

@Component({
  selector: 'app-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss'],
})
export class DemoContainerComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  df = inject(DemoFacade);
  nav = inject(SideNavFacade);
  ls = inject(LoadingService);
  eb = inject(SidePanelService);

  title: string = environment.title;
  header = 'Please select a demo';
  demos = this.df.getDemos();

  isLoading = false;

  sidenavMode = this.nav.getSideNavPosition();
  sidenavVisible = this.nav.getSideNavVisible();
  workbenchMargin = this.sidenavVisible.pipe(
    map(visible => { return visible ? { 'margin-left': '5px' } : {} })
  );

  currentCMD = this.eb.getCommands();
  showMdEditor: boolean = false;

  constructor() {
    effect(() => {
      this.showMdEditor = this.currentCMD() === SidebarActions.HIDE_MARKDOWN ? false : true;
    });

    this.ls.getLoading().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      Promise.resolve(null).then(() => { this.isLoading = value });
    });
  }

  ngOnInit() {
    this.df.init();
    this.setComponentMetadata();
  }

  rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  setComponentMetadata() {
    this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((event) => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.route)),
      filter((route: ActivatedRoute) => route.outlet === 'primary')
    )
      .subscribe((route: ActivatedRoute) => {
        this.header =
          route.component != null
            ? `Component: ${route.component
              .toString()
              .substring(7, route.component.toString().indexOf('{') - 1)}`
            : '';
      });
  }
}
