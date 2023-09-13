import { Component, inject } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ThemeService } from '../theme/theme.service';
import { SidebarActions } from './sidebar.actions';
import { SidePanelService } from './sidepanel.service';
import { SideNavService } from '../sidenav/sidenav.service';
import { StatefulDemoService } from 'src/app/demos/samples/statefull/stateful-demo.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  sns = inject(SnackbarService);
  eb = inject(SidePanelService);
  ts = inject(ThemeService);
  ds = inject(StatefulDemoService);
  editorDisplayed = false;
  sidenav = inject(SideNavService);
  icon = "create";

  toggleTheme() {
    this.ts.toggleTheme();
  }

  toggleEditor() {
    if (this.editorDisplayed) {
      this.eb.triggerCmd(SidebarActions.HIDE_MARKDOWN);
    } else {
      this.eb.triggerCmd(SidebarActions.SHOW_MARKDOWN);
    }
    this.editorDisplayed = !this.editorDisplayed;
    this.icon = this.editorDisplayed ? "close" : "create";
  }

  toogleSideNav() {
    this.sidenav.toggleMenuVisibility();
  }

  showUpload() {
    this.sns.displayAlert('Info', 'Not implemented - just a Demo');
  }

  addDemo() {
    const newDemo = {
      "id": 27,
      "url": "langfeatures",
      "title": "Language Features",
      "sortOrder": 0,
      "visible": true,
    };
    this.ds.addDemo(newDemo);
  }
}
