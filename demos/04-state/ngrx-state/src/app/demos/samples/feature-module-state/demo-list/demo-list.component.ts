import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DemoItem } from '../../../demo-base/demo-item.model';
import { DemoFacade } from '../../../state/demo.facade';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss'],
})
export class DemoListComponent {
  df = inject(DemoFacade);
  @Output() onSelectDemo: EventEmitter<null> = new EventEmitter();

  demos$ = this.df.getDemos();
  filter$ = this.df.getFilter();

  view$ = combineLatest([this.demos$, this.filter$]).pipe(
    map(([demos, filter]) => {
      return filter !== ''
        ? demos.filter((d: DemoItem) =>
          d.title.toLowerCase().includes(filter.toLowerCase())
        )
        : demos;
    })
  );

  deleteItem(item: DemoItem) {
    this.df.deleteDemo(item);
  }

  changeVisibility(item: DemoItem) {
    this.df.updateDemo(item);
  }

  selectItem(item: DemoItem) {
    this.df.selectDemo(item);
    this.onSelectDemo.emit();
  }
}
